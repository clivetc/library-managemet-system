import Appointment from "../model/appointments";
import User from "../model/user";

class AppointmentService {
	async createAppointment(
		email: string,
		date: Date,
		Phonenumber: string,
		userId: string,
	): Promise<Appointment> {
		try {
			const appointment = await Appointment.create({
				email,
				date,
				Phonenumber,
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
}

export default new AppointmentService();
