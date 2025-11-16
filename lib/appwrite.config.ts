import * as sdk from "node-appwrite";


export const {
  DATABASE_ID,
  ENDPOINT,
  PROJECT_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  API_KEY,
} = process.env;


const client = new sdk.Client();

client
  .setEndpoint(process.env.ENDPOINT!) // https://cloud.appwrite.io/v1
  .setProject(process.env.PROJECT_ID!) // Project ID
  .setKey(process.env.API_KEY!); // API Key with DB + Storage access

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);

// 👇 Optional but useful during debugging
console.log("🌍 Appwrite Config Check:", {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  API_KEY: API_KEY ? "✅ Loaded" : "❌ Missing",
});
