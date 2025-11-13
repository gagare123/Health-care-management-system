"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PROJECT_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from '@/types/appwrite.types';
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    console.log({
      ENDPOINT,
      PROJECT_ID,
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
    });

    // ✅ Ensure schedule is ISO string
    const appointmentData = {
      ...appointment,
      schedule:
        typeof appointment.schedule === "string"
          ? appointment.schedule
          : new Date(appointment.schedule).toISOString(),
    };
   console.log("Creating appointment document with:", appointmentData);

  
    // ✅ Create the appointment
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    throw error;
  }
};

// GET APPOINTMENT

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error("❌ Error fetching appointment:", error);
    return null;
  }
};

// GET RECENT APPOINTMENT

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // ✅ Fixed: Remove empty brackets []
    const counts = appointments.documents.reduce(
      (acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents
    };

    return parseStringify(data);
  } catch (error) {
    console.error(" Error fetching recent appointments:", error);
    return null;
  }
};

// updat appointment

export const  updateAppointment = async ({
  appointmentId, userId, appointment, type}: 
UpdateAppointmentParams) =>{
try{

  const updateAppointment = await databases.updateDocument(
    DATABASE_ID!,
    APPOINTMENT_COLLECTION_ID!,
    appointmentId,
    appointment
  )

  if(!updateAppointment){
    throw new Error('Appointment not found');
  }
// SMS service

revalidatePath('/admin');
return parseStringify(updateAppointment)
} catch(error){
  console.log(error)
}
}