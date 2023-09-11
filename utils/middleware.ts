import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";

dotenv.config();

const corsMiddleware = Cors({
  origin: process.env.ALLOWED_ORIGIN,
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

// Export the CORS middleware
export const cors = initMiddleware(corsMiddleware);
