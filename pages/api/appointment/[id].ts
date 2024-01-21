import { NextApiRequest, NextApiResponse } from "next";
import appointmentService from "@/utils/service/appointment";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const { id } = req.query;
		try {
			const appointments = await appointmentService.getAppointmentsByUserId(
				id as string,
			);

			return res.status(200).json({ success: true, data: appointments });
		} catch (error) {
			console.error("Error getting appointments:", error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
