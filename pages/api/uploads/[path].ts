import { join } from "path";
import { createReadStream } from "fs";
import { cors } from "@/utils/middleware";
import { get } from "@vercel/blob";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await cors(req, res);

	const { path } = req.query;

	if (typeof path === "string") {
		const { stream } = await get(`uploads/${path}`);
		stream.pipe(res);
	} else {
		res.status(400).json({ error: "Invalid image path" });
	}
};
