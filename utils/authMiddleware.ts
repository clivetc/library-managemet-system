// authMiddleware.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { jwtSecret } from "@/utils/secretKey";

declare module "next" {
	export interface NextApiRequest {
		user?: { userId: string; email: string }; // Adjust this type based on your JWT payload
	}
}

export const authenticate = (
	req: NextApiRequest,
	res: NextApiResponse,
	// next: () => void,
) => {
	const accessToken = req.headers.authorization;
	console.log({ accessToken });

	if (!accessToken) {
		return res
			.status(401)
			.json({ error: "Unauthorized: Access token missing" });
	}

	jwt.verify(
		accessToken,
		jwtSecret as string,
		(err: VerifyErrors | null, decoded: any) => {
			if (err) {
				return res.status(401).json({ error: "Unauthorized: Invalid token" });
			}

			req.user = { userId: decoded.userId, email: decoded.email };
			console.log(req.user);
			// next();
		},
	);
};
