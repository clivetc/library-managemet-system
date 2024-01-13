// authMiddleware.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/utils/secretKey";

declare module "next" {
	export interface NextApiRequest {
		user?: { userId: string; email: string }; // Adjust this type based on your JWT payload
	}
}

export const authenticate =
	(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		// Get the token from the request headers
		const token = req.headers.authorization?.replace("Bearer ", "");

		// Check if the token is provided
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: Missing token" });
		}

		try {
			// Verify the token using the secret key
			const decoded = jwt.verify(token, jwtSecret) as {
				userId: string;
				email: string;
			};

			// Attach the decoded user information to the request
			req.user = decoded;

			// Call the original API route handler
			await handler(req, res);
		} catch (error) {
			console.error(error);
			return res.status(401).json({ error: "Unauthorized: Invalid token" });
		}
	};
