import type { NextApiRequest, NextApiResponse } from "next";
import { cors } from "@/utils/middleware";
import Admin from "@/utils/model/admin";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await cors(req, res);
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const admin = await Admin.findOne({
        where: { id },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!admin) {
        return res.status(404).json({ error: "User not found" });
      }
      // Return the user data
      return res.status(200).json({ admin });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Handle other HTTP methods if needed
  return res.status(405).json({ error: "Method Not Allowed" });
}
