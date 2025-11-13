"use server";

import { withRetry } from "@/lib/utils/withRetry";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  API_KEY,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// ----------------------------------------------------
// CREATE APPWRITE USER
// ----------------------------------------------------
export const createUser = async (user: CreateUserParams) => {
  console.log("🧩 [createUser] Attempting to create user:", user);

  try {
    const newUser = await withRetry(
      () => users.create(ID.unique(), user.email, user.phone, undefined, user.name),
      4,
      3000
    );

    console.log("✅ [createUser] Success:", newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("❌ [createUser] Failed:", error);

    if (error?.code === 409) {
      console.log("⚠️ [createUser] Duplicate email, fetching existing user…");

      const existingUser = await withRetry(
        () => users.list([Query.equal("email", [user.email])]),
        3,
        2000
      );

      const found = existingUser?.users?.[0];
      if (found) {
        console.log("✅ [createUser] Found existing user:", found.$id);
        return parseStringify(found);
      }
    }

    return null;
  }
};

// ----------------------------------------------------
// GET USER
// ----------------------------------------------------
export const getUser = async (userId: string) => {
  try {
    const user = await withRetry(() => users.get(userId), 3, 2000);
    return parseStringify(user);
  } catch (error) {
    console.error("❌ Error retrieving user:", error);
    return null;
  }
};

// ----------------------------------------------------
// REGISTER PATIENT
// ----------------------------------------------------
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log("📋 [registerPatient] Received data:", {
    userId: patient.userId,
    hasDocument: !!identificationDocument,
  });

  try {
    let file = null;

    // ✅ Upload ID document if present
    if (
      identificationDocument &&
      identificationDocument.get("blobFile") &&
      identificationDocument.get("fileName")
    ) {
      const blob = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;

      if (blob.size > 0) {
        const inputFile = InputFile.fromBuffer(blob, fileName);

        file = await withRetry(
          () => storage.createFile(BUCKET_ID!, ID.unique(), inputFile),
          3,
          2000
        );
        console.log("✅ [registerPatient] File uploaded:", file.$id);
      }
    }

    // ✅ Prepare patient data matching Appwrite schema exactly
    const patientData = {
      // Required fields
      userId: patient.userId,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,

      // Optional fields - convert Date to ISO string
      birthDate: patient.birthDate instanceof Date
        ? patient.birthDate.toISOString()
        : patient.birthDate || null,

      gender: patient.gender || null,
      address: patient.address || null,
      occupation: patient.occupation || null,

      // Emergency contact
      emergencyContactName: patient.emergencyContactName || null,
      emergencyContactNumber: patient.emergencyContactNumber || null,

      // Insurance
      insuranceProvider: patient.insuranceProvider || null,
      insurancePolicyNumber: patient.insurancePolicyNumber || null,

      // Medical info
      allergies: patient.allergies || null,
      currentMedication: patient.currentMedication || null,
      familyMedicalHistory: patient.familyMedicalHistory || null,
      pastMedicalHistory: patient.pastMedicalHistory || null,
      primaryPhysician: patient.primaryPhysician || null,

      // Identification
      identificationType: patient.identificationType || null,
      identificationNumber: patient.identificationNumber || null,
      identificationDocumentId: file?.$id ?? null,
      identificationDocumentUrl: file?.$id
        ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
        : null,

      // Consent
      treatmentConsent: patient.treatmentConsent ?? null,
      privacyConcent: patient.privacyConsent ?? true, // Note: Appwrite has typo "Concent"
      disclosureConsent: patient.disclosureConsent ?? false
    };

    console.log("📤 [registerPatient] Sending to Appwrite:", {
      userId: patientData.userId,
      email: patientData.email,
      hasAllRequired: !!(patientData.userId && patientData.name && patientData.email && patientData.phone),
    });

    // ✅ Create patient document
    const newPatient = await withRetry(
      () =>
        databases.createDocument(
          DATABASE_ID!,
          PATIENT_COLLECTION_ID!,
          ID.unique(),
          patientData
        ),
      3,
      2000
    );

    console.log("✅ [registerPatient] Success:", newPatient.$id);
    return parseStringify(newPatient);
  } catch (error: any) {
    console.error("❌ [registerPatient] Error:", {
      message: error.message,
      code: error.code,
      type: error.type,
      response: error.response,
    });
    throw error;
  }
};

// ----------------------------------------------------
// GET PATIENT
// ----------------------------------------------------
export const getPatient = async (userId: string) => {
  console.log("🩺 [getPatient] Fetching patient for userId:", userId);

  try {
    const response = await withRetry(
      () =>
        databases.listDocuments(
          DATABASE_ID!,
          PATIENT_COLLECTION_ID!,
          [Query.equal("userId", [userId])]
        ),
      3,
      2000
    );

    console.log("✅ [getPatient] Found:", response.total, "documents");

    if (!response.documents.length) {
      console.warn(`⚠️ No patient found for userId: ${userId}`);
      return null;
    }

    return parseStringify(response.documents[0]);
  } catch (error) {
    console.error("❌ [getPatient] Error:", error);
    return null;
  }
};