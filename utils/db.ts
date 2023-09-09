import { db } from "@vercel/postgres";

async function connectToDatabase() {
  try {
    await db.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export { connectToDatabase };
