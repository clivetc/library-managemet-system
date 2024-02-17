import { connectToDatabase } from "@/utils/db";
import { generatePasswordResetToken } from "@/utils/generatePasswordResetToken";
import { cors } from "@/utils/middleware";
import User from "@/utils/model/user";
import { sendPasswordResetEmail } from "@/utils/sendPasswordResetEmail";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await cors(req, res);
	const client = await connectToDatabase();
	const { email } = req.body;

	if (req.method === "POST") {
		try {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}
			const token = generatePasswordResetToken(user.id);
			user.passwordResetToken = token;
			await user.save();
			await sendPasswordResetEmail(email, token);

			return res.status(200).json({ message: "Password reset email sent" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
