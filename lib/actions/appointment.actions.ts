
"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
   PATIENT_COLLECTION_ID,
  
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import type { Appointment } from "@/types/appwrite.types";


export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    //  Ensure schedule is ISO string
    const appointmentData = {
      ...appointment,
      schedule:
        typeof appointment.schedule === "string"
          ? appointment.schedule
          : new Date(appointment.schedule).toISOString(),
    };

    // Create the appointment
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
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
    console.error("Error fetching appointment:", error);
    return null;
  }
};

//GET RECENT APPOINTMENT

// export const getRecentAppointmentList = async () => {
//   try {
//     const appointments = await databases.listDocuments(
//       DATABASE_ID!,
//       APPOINTMENT_COLLECTION_ID!,
//       [Query.orderDesc("$createdAt")]
//     );

//     // Ensure patient data is properly populated
//     const enrichedAppointments = appointments.documents.map((appointment) => {
//       // If patient is not populated, try to fetch it
//       if (!appointment.patient || typeof appointment.patient === 'string') {
//         return {
//           ...appointment,
//           patient: null, // Set to null if missing
//         };
//       }
//       return appointment;
//     });

//     const initialCounts = {
//       scheduledCount: 0,
//       pendingCount: 0,
//       cancelledCount: 0,
//     };

//     const counts = enrichedAppointments.reduce(
//       (acc, appointment) => {
//         switch (appointment.status) {
//           case "scheduled":
//             acc.scheduledCount++;
//             break;
//           case "pending":
//             acc.pendingCount++;
//             break;
//           case "cancelled":
//             acc.cancelledCount++;
//             break;
//         }
//         return acc;
//       },
//       initialCounts
//     );

//     const data = {
//       totalCount: appointments.total,
//       ...counts,
//       documents: enrichedAppointments,
//     };

//     return data;
//   } catch (error) {
//     console.error(
//       "An error occurred while retrieving the recent appointments:",
//       error
//     );
//     // Return empty structure instead of throwing
//     return {
//       totalCount: 0,
//       scheduledCount: 0,
//       pendingCount: 0,
//       cancelledCount: 0,
//       documents: [],
//     };
//   }
// };

export const getRecentAppointmentList = async (): Promise<{
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: Appointment[];
}> => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const enrichedAppointments = await Promise.all(
      appointments.documents.map(async (appointment) => {
        try {
          // Extract ID from relationship field
          const patientId =
            typeof appointment.patient === "string"
              ? appointment.patient
              : appointment.patient?.$id; // relationship object

          if (!patientId) {
            console.warn(" Missing patient relationship for:", appointment.$id);
            return { ...appointment, patient: null };
          }

          const patientDoc = await databases.getDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,  // ✔️ correct collection ID
            patientId                // ✔️ ALWAYS pass the $id only
          );

          return { ...appointment, patient: patientDoc };

        } catch (error) {
          console.error(
            ` Failed to fetch patient for appointment ${appointment.$id}:`,
            error
          );

          return { ...appointment, patient: null };
        }
      })
    );

    // Count statuses
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = enrichedAppointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    return {
      totalCount: appointments.total,
      ...counts,
      documents: enrichedAppointments as Appointment[],
    };

  } catch (error) {
    console.error("Error retrieving recent appointments:", error);

    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }
};


// updat appointment

export const  updateAppointment = async ({
  appointmentId, 
  userId: _userId,
  appointment,
  type: _type } : 
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
   
  const smsMessage = 
  `Hi, it's CarePulse.
  ${_type === 'schedule'
    ? `Your appointment has been scheduled for ${formatDateTime(
      appointment.schedule!
    )}`
    : `We regret to inform you that your appointment has been cancelled
    for the following reason: ${appointment.cancellationtReason}`
  }`;
  
 await sendSMSNotification(_userId, smsMessage);

revalidatePath('/admin');
return parseStringify(updateAppointment)
} catch(error){
  console.error("Error updating appointment:", error);
  throw error;
}
}
 

//Create SMS Notification
export const sendSMSNotification = async (userId: string, content: string) =>{
  try{
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    )

   return parseStringify(message);

  }catch (error){
   console.error("Error sending SMS notification:", error);
   throw error;
  }
}

