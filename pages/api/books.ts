import { connectToDatabase } from "@/utils/db";
import Book from "@/utils/model/books";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";

config();

const UPLOADS_DIRECTORY = path.join(process.cwd(), "uploads"); // Path to the uploads directory

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

      // Save the base64 image to the local "uploads" directory
      const base64Image = imageurl.split(";base64,").pop();
      const fileName = `${Date.now()}-${title
        .replace(/\s+/g, "-")
        .toLowerCase()}.jpg`;
      const filePath = path.join(UPLOADS_DIRECTORY, fileName);

      await fs.writeFile(filePath, Buffer.from(base64Image, "base64"));

      // Create the book with the image URL
      const imageUrl = `/uploads/${fileName}`;
      const book = await Book.create({
        title,
        author,
        imageurl: imageUrl,
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
