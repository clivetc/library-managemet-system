import { join } from "path";
import { createReadStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { path } = req.query;

  if (typeof path === "string") {
    const filePath = join(
      process.cwd(),
      "uploads",
      ...(Array.isArray(path) ? path : [path]),
    );

    // Stream the image file to the response
    const readStream = createReadStream(filePath);
    readStream.pipe(res);
  } else {
    res.status(400).json({ error: "Invalid image path" });
  }
};
