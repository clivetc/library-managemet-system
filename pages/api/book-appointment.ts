import { NextApiRequest, NextApiResponse } from "next";
import appointmentService from "@/utils/service/appointment";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		try {
			const { email, date, userId, phoneNumber, resolved } = req.body;

			if (!email || !date) {
				return res.status(400).json({ error: "Invalid input" });
			}

			const newAppointment = await appointmentService.createAppointment(
				email,
				date,
				phoneNumber,
				userId,
				resolved,
			);

			return res.status(201).json({
				success: true,
				message: "Appointment booked successfully",
				data: newAppointment,
			});
		} catch (error) {
			console.error("Error booking appointment:", error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	} else if (req.method === "GET") {
		try {
			const appointments = await appointmentService.getAllAppointments({
				page: 1,
				pageSize: 10,
			});

			return res.status(200).json({ ...appointments });
		} catch (error) {
			console.error("Error getting appointments:", error);
			return res.status(500).json({ error: "Internal Server Error" });
		}
	}

	return res.status(405).json({ error: "Method Not Allowed" });
}
