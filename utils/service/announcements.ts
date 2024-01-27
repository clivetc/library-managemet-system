import { PaginationOptions } from "@/types/interfaces";
import Announcements from "../model/announcements";

interface AnnouncementsResponse {
	data: Announcements[];
	page: number;
	pageCount: number;
	total: number;
}

class AnnouncementService {
	async createAnnouncement(
		title: string,
		description: string,
		category: string,
		date: Date,
	): Promise<Announcements> {
		try {
			const announcement = await Announcements.create({
				title,
				description,
				category,
				date,
			});
			return announcement;
		} catch (error) {
			console.error("Error creating announcement:", error);
			throw error;
		}
	}

	async getAccouchements(
		options: PaginationOptions,
	): Promise<AnnouncementsResponse> {
		try {
			const { page, pageSize } = options;

			const offset = (page - 1) * pageSize;

			const { rows: data, count } = await Announcements.findAndCountAll({
				offset,
				limit: pageSize,
				order: [["createdAt", "DESC"]],
			});

			const pageCount = Math.ceil(count / pageSize);

			const response: AnnouncementsResponse = {
				data,
				page,
				pageCount,
				total: count,
			};

			return response;
		} catch (error) {
			console.error("Error Occurred:", error);
			throw error;
		}
	}
}

export default new AnnouncementService();
