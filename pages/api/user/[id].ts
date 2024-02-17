// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/utils/model/user";
import { cors } from "@/utils/middleware";
import { authenticate } from "@/utils/authMiddleware";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await cors(req, res);
	if (req.method === "GET") {
		try {
			// await authenticate(req, res);
			const { id } = req.query;
			// Fetch the user by ID
			const user = await User.findOne({
				where: { id },
				attributes: {
					exclude: ["password"],
				},
			});
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			// Return the user data
			return res.status(200).json({ user });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	// Handle other HTTP methods if needed
	return res.status(405).json({ error: "Method Not Allowed" });
}
