import { connectToDatabase } from "@/utils/db";
import Book from "@/utils/model/books";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { cors } from "@/utils/middleware";
import { put } from "@vercel/blob";
import { createReadStream } from "fs";

config();

const UPLOADS_DIRECTORY = path.join(process.cwd(), "uploads"); // Path to the uploads directory

type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await cors(req, res);
	const client = await connectToDatabase();
	if (req.method === "POST") {
		try {
			// jsonParser(req, res, async () => {

			const {
				title,
				author,
				imageurl,
				description,
				available,
				availabledate,
				quantity,
			} = req.body;
			// Validate if the required fields are provided
			if (!title || !author) {
				return res.status(400).json({ error: "Title and author are required" });
			}
			const fileExtension = imageurl.split(";base64,")[0].split("/")[1];

			const { url } = await put(
				`uploads/${Date.now()}-${title.replace(/\s+/g, "-").toLowerCase()}`,
				Buffer.from(imageurl.split(";base64,").pop(), "base64"),
				{
					access: "public",
					contentType: `image/${fileExtension}`,
				},
			);

			const book = await Book.create({
				title,
				author,
				imageurl: url,
				description,
				available,
				availabledate,
				quantity,
			});

			return res.status(201).json({ book });
			// });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	if (req.method === "GET") {
		try {
			const pageQueryParam = req.query.page;
			const pageSizeQueryParam = req.query.pageSize;
			const sortBy = req.query.sortBy || "createdAt";
			const sortOrder = req.query.sortOrder || "DESC";

			const page: number = pageQueryParam
				? parseInt(pageQueryParam as string, 10)
				: 1;
			const pageSize: number = pageSizeQueryParam
				? parseInt(pageSizeQueryParam as string, 10)
				: 10;

			if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
				return res
					.status(400)
					.json({ error: "Invalid page or pageSize parameters" });
			}

			const offset = (page - 1) * pageSize;

			const data = await Book.findAll({
				offset,
				limit: pageSize,
				order: [[sortBy as string, sortOrder as string]],
			});
			const count = await Book.count();

			return res.status(200).json({ data, count, page, pageSize });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	// Handle other HTTP methods if needed

	return res.status(405).json({ error: "Method Not Allowed" });
}
