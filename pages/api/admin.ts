import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Admin from "@/utils/model/admin";
import { connectToDatabase } from "@/utils/db";
import { cors } from "@/utils/middleware";
import { jwtSecret } from "@/utils/secretKey";
import jwt, { SignOptions } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await cors(req, res);
  const client = await connectToDatabase();
  if (req.method === "POST") {
    const { username, password, action } = req.body;

    try {
      if (action === "login") {
        // Admin login logic
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) {
          return res.status(401).json({ error: "Admin not found" });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        const accessTokenOptions: SignOptions = {
          expiresIn: "14d", // 2 weeks
        };

        const accessToken = jwt.sign(
          { adminId: admin.id, email: username },
          jwtSecret as string, // Cast to string
          accessTokenOptions,
        );
        // You can generate a token here if needed and return it as a response
        return res
          .status(200)
          .json({ message: "Admin login successful", accessToken });
      } else if (action === "addAdmin") {
        // Assuming you have implemented authentication and have access to the authenticated user
        // In this example, I'm assuming isAdmin is provided in the request or as part of your authentication logic
        const isAdmin = req.body.isAdmin;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if (!isAdmin) {
          return res
            .status(401)
            .json({ error: "You are not authorized to add admins" });
        }

        // Validate if the required fields are provided
        if (!username || !password) {
          return res
            .status(400)
            .json({ error: "Username and password are required" });
        }

        // Create the admin
        const admin = await Admin.create({
          username,
          password,
          firstName,
          lastName,
          isAdmin: true, // Set the isAdmin flag to true for new admins
        });

        return res.status(201).json({ admin });
      } else {
        return res.status(400).json({ error: "Invalid action" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ error: "Method Not Allowed" });
}
