import { PaginationOptions } from "@/types/interfaces";
import Appointment from "../model/appointments";
import User from "../model/user";

class AppointmentService {
	async createAppointment(
		email: string,
		date: Date,
		phoneNumber: string,
		userId: string,
	): Promise<Appointment> {
		try {
			const appointment = await Appointment.create({
				email,
				date,
				phoneNumber,
				userId,
			});

			return appointment;
		} catch (error) {
			console.error("Error creating appointment:", error);
			throw error;
		}
	}

	async getAppointmentsByUserId(userId: string): Promise<Appointment[]> {
		try {
			const appointments = await Appointment.findAll({
				where: { userId },
				include: [User],
			});

			return appointments;
		} catch (error) {
			console.error("Error getting appointments:", error);
			throw error;
		}
	}
	async getAllAppointments(
		options: PaginationOptions,
	): Promise<{ data: Appointment[]; count: number }> {
		try {
			const { page, pageSize } = options;

			const offset = (page - 1) * pageSize;

			const { rows: data, count } = await Appointment.findAndCountAll({
				offset,
				limit: pageSize,
				include: [User],
				order: [["createdAt", "DESC"]],
			});

			return { data, count };
		} catch (error) {
			console.error("Error getting appointments:", error);
			throw error;
		}
	}
}

export default new AppointmentService();
