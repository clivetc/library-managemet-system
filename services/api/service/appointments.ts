import { api } from "../apiClient";

interface IValues {
	userId: string;
	email: string;
	date: string;
	phoneNumber: string;
	resolved: boolean;
}
export async function createAppointment(values: IValues) {
	return await api.post("/book-appointment", values).then((res) => res.data);
}

export async function getAppointments() {
	return await api.get("/book-appointment").then((res) => res.data);
}

export async function getUserAppointments(userId: string) {
	return await api.get(`/appointment/${userId}`).then((res) => res.data);
}
