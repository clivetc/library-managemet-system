import { connectToDatabase } from "@/utils/db";
import Book from "@/utils/model/books";
import Posts from "@/utils/model/posts";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = await connectToDatabase();

  if (req.method === "POST") {
    const { post, enabled } = req.body;
    try {
      const posts = Posts.create({
        post,
        enabled,
      });
      return res.status(201).json({ posts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    try {
      const posts = await Posts.findAll();
      return res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
