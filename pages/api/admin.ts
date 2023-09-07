import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import Admin from "@/utils/model/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Check if the user is authorized to add admins
      // const { isAdmin } = req.user; // Assuming you have implemented authentication and have access to the authenticated user

      // if (!isAdmin) {
      //   return res
      //     .status(401)
      //     .json({ error: "You are not authorized to add admins" });
      // }

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
        isAdmin: false, // Set the isAdmin flag to false by default
      });

      return res.status(201).json({ admin });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed

  return res.status(405).json({ error: "Method Not Allowed" });
}
