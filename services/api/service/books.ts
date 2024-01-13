import { IBooks } from "@/types/interfaces";
import { api } from "../apiClient";
import { AxiosError } from "axios";

export const addBooks = async (values: IBooks) => {
	return api
		.post("/books", values)
		.then((resp) => resp.data)
		.catch((err: AxiosError) => {
			throw err;
		});
};

export const getBooks = async () => {
	return api.get("/books").then((res) => res.data);
};

export const deleteBook = async (id: string) => {
	return api.delete(`/books/${id}`).then((res) => res.data);
};
