import { IPosts } from "@/types/interfaces";
import { api } from "../apiClient";

interface IValues {
	post: string;
	enabled: boolean;
}
export async function getPosts() {
	return await api.get<{ data: IPosts[] }>("/posts").then((res) => res.data);
}

export async function createPost(values: IValues) {
	return await api.post("/posts", values).then((res) => res.data);
}
