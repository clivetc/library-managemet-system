import { AxiosError } from "axios";
import { api } from "../apiClient";
import { IUser } from "@/types/interfaces";

interface IValues {
	name: string;
	firstName: string;
	lastName: string;
	password: string;
	isAdmin: boolean;
}

export const addAdmin = async (values: IValues) => {
	return api
		.post("/register", { ...values })
		.then((resp) => {
			const response = resp.data;

			return response;
		})
		.catch((err: AxiosError) => {
			throw err;
		});
};

export const getAdmin = async () => {
	return await api.get<IUser[]>("/user").then((res) => res.data);
};
