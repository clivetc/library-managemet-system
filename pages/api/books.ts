import { connectToDatabase } from "@/utils/db";
import Book from "@/utils/model/books";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "dotenv";
config();
import { promisify } from "util";
import sharp from "sharp";
import { raw } from "body-parser";

const jsonParser = raw({ limit: "10mb" });

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await connectToDatabase();
  if (req.method === "POST") {
    const { title, author, imageurl, description, available, availabledate } =
      req.body;

    try {
      // Validate if the required fields are provided
      if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
      }
      const isJPEG = imageurl.startsWith("data:image/jpeg;");
      const isPNG = imageurl.startsWith("data:image/png;");

      if (!isJPEG && !isPNG) {
        return res.status(400).json({
          error: "Invalid image format. Only JPEG and PNG are supported.",
        });
      }

      // Resize and process the image based on its format
      const resizedImageBuffer = isJPEG
        ? await resizeAndProcessJPEG(imageurl)
        : await resizeAndProcessPNG(imageurl);

      const base64ImageURL = `data:image/${
        isJPEG ? "jpeg" : "png"
      };base64,${resizedImageBuffer}`;
      // Create the book
      const book = await Book.create({
        title,
        author,
        imageurl: base64ImageURL,
        description,
        available,
        availabledate,
      });

      return res.status(201).json({ book });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      // Fetch all books from the database
      const books = await Book.findAll();
      return res.status(200).json({ books });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  // Handle other HTTP methods if needed

  return res.status(405).json({ error: "Method Not Allowed" });
}

async function resizeAndProcessJPEG(imageData: string) {
  const buffer = Buffer.from(imageData, "base64");
  const processedImageBuffer = await sharp(buffer)
    .resize(200, 200) // Resize the image to your desired dimensions
    .jpeg({ quality: 80 }); // Set JPEG quality (adjust as needed)
  // .toBuffer(); // Convert the image to a buffer

  return processedImageBuffer;
}

async function resizeAndProcessPNG(imageData: string) {
  const buffer = Buffer.from(imageData.split(";base64,")[1], "base64");
  const processedImageBuffer = await sharp(buffer)
    .resize(200, 200) // Resize the image to your desired dimensions
    .png({ compressionLevel: 8 }); // Set PNG compression level (adjust as needed)
  // .toBuffer(); // Convert the image to a buffer

  return processedImageBuffer;
}
