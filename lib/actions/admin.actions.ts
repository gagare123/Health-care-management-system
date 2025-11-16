"use server";

export async function validateAdminPasskey(passkey: string) {
  try {
    // This runs on the server, so the passkey stays secure
    const adminPasskey = process.env.ADMIN_PASSKEY;

    if (!adminPasskey) {
      return { success: false, error: "Admin passkey not configured" };
    }

    if (passkey === adminPasskey) {
      return { success: true };
    }

    return { success: false, error: "Invalid passkey" };
  } catch (error) {
    return { success: false, error: "An error occurred" };
  }
}