// utils/middleware/cors.ts
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const corsMiddleware = Cors({
	origin: process.env.NODE_ENV === "development" ? "*" : undefined,
	methods: ["GET", "POST", "PUT", "DELETE"],
});

type Middleware = (
	req: NextApiRequest | Cors.CorsRequest,
	res: NextApiResponse,
	next: (err?: any) => any,
) => void;

export const initMiddleware =
	(middleware: Middleware) => (req: NextApiRequest, res: NextApiResponse) =>
		new Promise<void>((resolve, reject) => {
			middleware(
				req as NextApiRequest | Cors.CorsRequest,
				res,
				(result: any) => {
					if (result instanceof Error) {
						return reject(result);
					}
					return resolve(result);
				},
			);
		});

export const cors = initMiddleware(corsMiddleware);
