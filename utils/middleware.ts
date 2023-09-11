// utils/middleware/cors.ts
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const corsMiddleware = Cors({
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

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const cors = initMiddleware(corsMiddleware);
