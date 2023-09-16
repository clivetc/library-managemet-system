import { connectToDatabase } from "@/utils/db";
import Book from "@/utils/model/books";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "dotenv";

config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await connectToDatabase();

  if (req.method === "PUT") {
    // Handle the edit/update operation
    const {
      id,
      title,
      author,
      imageurl,
      description,
      available,
      availabledate,
    } = req.body;

    try {
      // Validate if the required fields are provided
      if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
      }

      // Update the book
      const updatedBook = await Book.update(
        {
          title,
          author,
          imageurl,
          description,
          available,
          availabledate,
        },
        {
          where: { id },
        },
      );

      return res.status(200).json({ book: updatedBook });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    // Handle the delete operation
    const { id } = req.body;

    try {
      // Delete the book by ID
      await Book.destroy({
        where: { id },
      });

      return res.status(204).send({});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
