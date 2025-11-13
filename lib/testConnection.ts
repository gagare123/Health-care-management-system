import { Client } from "node-appwrite";

(async () => {
  const client = new Client()
    .setEndpoint(process.env.ENDPOINT!)
    .setProject(process.env.PROJECT_ID!)
    .setKey(process.env.API_KEY!);

  try {
    const res = await client.call("get", "/v1/health");
    console.log("✅ Connection successful:", res);
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
})();
