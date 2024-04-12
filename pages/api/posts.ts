import { connectToDatabase } from "@/utils/db";
import { cors } from "@/utils/middleware";
import Posts from "@/utils/model/posts";
import type { NextApiRequest, NextApiResponse } from "next";
import { Op, literal } from "sequelize";
import moment from "moment";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await cors(req, res);
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

			const oneMonthAgo = moment().subtract(1, "months").toDate();

			const data = await Posts.findAll({
				where: {
					createdAt: {
						[Op.gte]: oneMonthAgo,
					},
				},
				offset,
				limit: pageSize,
				order: [[sortBy as string, sortOrder as string]],
			});

			const count = await Posts.count({
				where: {
					createdAt: {
						[Op.gte]: oneMonthAgo,
					},
				},
			});

			return res.status(200).json({ data, count, page, pageSize });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	return res.status(405).json({ error: "Method Not Allowed" });
}
