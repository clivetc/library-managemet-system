import { IAnnouncements } from "@/types/interfaces";
import { api } from "../apiClient";

interface IValues {
	title: string;
	description: string;
	category: string;
	date: string;
}

export function createAnnouncement(values: IValues) {
	return api.post("/announcements", values).then((res) => res.data);
}

export function getAllAnnouncements() {
	return api
		.get<{ data: IAnnouncements[] }>("/announcements")
		.then((res) => res.data);
}
