// lib/utils/withRetry.ts

/**
 * Retries a promise-based function when a timeout or transient network error occurs.
 * By default, retries up to 3 times with a 2-second delay.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 2000
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Try executing the function
      return await fn();
    } catch (err: any) {
      // ✅ Correctly detect timeout errors
      const isTimeout =
        err?.code === "UND_ERR_CONNECT_TIMEOUT" ||
        err?.message?.includes("Connect Timeout") ||
        err?.message?.includes("fetch failed");

      if (!isTimeout) {
        // ❌ Not a timeout — don't retry (e.g., 403, 404, 409, validation errors)
        throw err;
      }

      lastError = err;

      console.warn(
        `⏳ [Retry ${attempt}/${retries}] Timeout error occurred. Retrying in ${delayMs}ms...`
      );

      // Wait before retrying
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  console.error("❌ All retry attempts failed. Throwing last error.");
  throw lastError;
}
