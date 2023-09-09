// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import User from "@/utils/model/user";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtSecret } from "@/utils/secretKey";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Validate if the required fields are provided
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const accessTokenOptions: SignOptions = {
        expiresIn: "14d", // 2 weeks
      };

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret as string, // Cast to string
        accessTokenOptions,
      );

      // Return a success message or user data
      return res
        .status(200)
        .json({ message: "Login successful", currentUser: user, accessToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed

  return res.status(405).json({ error: "Method Not Allowed" });
}
