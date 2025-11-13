"use server";

import { withRetry } from "@/lib/utils/withRetry";
import { ID,  Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: unknown) {
    // Check existing user
    if (error && typeof error === 'object' && 'code' in error && error.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

//REGISTER PATIENT

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file = null;

    //  Upload ID document if present
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
      }
    }

    //  Prepare patient data matching Appwrite schema exactly
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

    return parseStringify(newPatient);
  } catch (error: unknown) {
    console.error("Error registering patient:", error);
    throw error;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

