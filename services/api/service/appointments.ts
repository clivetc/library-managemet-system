import { IAppointMents } from "@/types/interfaces";
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
	return await api
		.get<{ data: IAppointMents[] }>("/book-appointment")
		.then((res) => res.data.data);
}

export async function getUserAppointments(userId: string) {
	return await api
		.get<{ data: IAppointMents[] }>(`/appointment/${userId}`)
		.then((res) => res.data);
}
