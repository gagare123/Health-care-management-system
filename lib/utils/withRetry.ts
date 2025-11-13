export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 2000
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Try executing the function
      return await fn();
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      
      const isTimeout =
        error?.code === "UND_ERR_CONNECT_TIMEOUT" ||
        error?.message?.includes("Connect Timeout") ||
        error?.message?.includes("fetch failed");

      if (!isTimeout) {
        throw err;
      }

      lastError = err;

      console.warn(
        ` [Retry ${attempt}/${retries}] Timeout error occurred. Retrying in ${delayMs}ms...`
      );
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  console.error("All retry attempts failed. Throwing last error.");
  throw lastError;
}