// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/utils/model/user";
import Books from "@/utils/model/books";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, author } = req.body;

    try {
      // Validate if the required fields are provided
      if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
      }

      // Create the book
      const book = await Book.create({
        title,
        author,
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
