import { join } from "path";
import { cors } from "@/utils/middleware";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await cors(req, res);

	const { path } = req.query;

	if (typeof path === "string") {
		const response = await fetch(`/uploads/${path}`);
		if (response.ok) {
			const reader = response.body!.getReader();

			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (value) res.write(Buffer.from(value));
				}

				res.end();
			} catch (error) {
				console.error("Error piping streams:", error);
				res.status(500).json({ error: "Internal Server Error" });
			}
		} else {
			res.status(404).json({ error: "Image not found" });
		}
	} else {
		res.status(400).json({ error: "Invalid image path" });
	}
};
