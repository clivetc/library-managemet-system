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
	if (req.method === "PATCH") {
		const { id } = req.query;
		const { resolved } = req.body;

		try {
			if (typeof resolved !== "boolean") {
				return res.status(400).json({ error: "Invalid 'resolved' value" });
			}

			const updatedAppointment = await appointmentService.updateAppointment(
				id as string,
				resolved,
			);

			return res.status(200).json({
				success: true,
				message: "Appointment updated successfully",
				data: updatedAppointment,
			});
		} catch (error: any) {
			console.error("Error updating appointment:", error);
			if (error.statusCode) {
				return res.status(error.statusCode).json({ error: error.message });
			}
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}
}
