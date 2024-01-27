import { NextApiRequest, NextApiResponse } from "next";
import announcementService from "@/utils/service/announcements";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		try {
			const { title, description, category, date } = req.body;

			if (!title || !description || !category) {
				return res.status(400).json({ error: "Invalid input" });
			}

			const newAnnouncement = await announcementService.createAnnouncement(
				title,
				description,
				category,
				date,
			);
			return res.status(201).json({
				success: true,
				message: "Announcement created successfully",
				data: newAnnouncement,
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "GET") {
		try {
			const response = await announcementService.getAccouchements({
				page: 1,
				pageSize: 10,
			});
			return res.status(200).json({ ...response });
		} catch (error) {
			console.error("Error getting appointments:", error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	return res.status(405).json({ error: "Method Not Allowed" });
}
