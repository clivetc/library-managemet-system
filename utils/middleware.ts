import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

type Middleware = (
	req: Cors.CorsRequest,
	res: {
		statusCode?: number | undefined;
		setHeader(key: string, value: string): any;
		end(): any;
	},
	next: (err?: any) => any,
) => void;

const corsMiddleware: Middleware = Cors({
	origin: (origin, callback) => {
		// Check if the origin is allowed
		const allowedOrigins = [
			process.env.ALLOWED_ORIGIN,
			"http://localhost:3000",
		];

		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
});

export const initMiddleware =
	(middleware: Middleware) => (req: NextApiRequest, res: NextApiResponse) =>
		new Promise<void>((resolve, reject) => {
			middleware(req as Cors.CorsRequest, res as any, (result: any) => {
				if (result instanceof Error) {
					return reject(result);
				}
				return resolve(result);
			});
		});

export const cors = initMiddleware(corsMiddleware);
