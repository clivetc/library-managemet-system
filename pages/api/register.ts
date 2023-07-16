import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/utils/model/user";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Validate if the required fields are provided
      if (!username || !password) {
        return res
          .status(400)
          .json({ error: "Username and password are required" });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({
        username,
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
