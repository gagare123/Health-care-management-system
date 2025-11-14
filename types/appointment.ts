
import { Models } from "node-appwrite";
import type { Patient } from "./appwrite.types";

export type AppointmentStatus = "scheduled" | "pending" | "cancelled";

export interface Appointment extends Models.Document {
  patient: string | Patient | null; 
  schedule: string;                 
  reason: string;
  note: string | null;
  primaryPhysician: string;
  status: AppointmentStatus;
  userId: string;
  cancellationReason: string | null;
}
