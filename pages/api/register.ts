import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/utils/model/user";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await connectToDatabase();
  if (req.method === "POST") {
    const { firstName, lastName, email, name, password } = req.body;

    try {
      // Validate if the required fields are provided
      if (!firstName || !lastName || !email || !name || !password) {
        return res.status(400).json({
          error: "First Name,Last Name ,Email, Name and Password are required",
        });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({
        email,
        firstName,
        lastName,
        name,
        password: hashedPassword,
      });

      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed

  return res.status(405).json({ error: "Method Not Allowed" });
}
