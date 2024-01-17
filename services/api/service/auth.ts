import { ILogin, ILoginAdmin, IRegister } from "@/types/interfaces";
import { api } from "../apiClient";
import { AxiosError } from "axios";
import { setLocalStorage } from "@/utils/storage";

export const registerUser = async (values: IRegister) => {
	return api
		.post("/register", values)
		.then((resp) => resp.data)
		.catch((err: AxiosError) => {
			throw err;
		});
};

export const loginUser = async (values: ILogin) => {
	return api
		.post("/user", { ...values, action: "login" })
		.then((resp) => {
			const response = resp.data;

			const accessToken = response.accessToken;
			const id = response.currentUser.id;

			if (response.accessToken) {
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("userId", id);
				setLocalStorage("accessToken", accessToken);
				setLocalStorage("userId", id);
			}

			return response;
		})
		.catch((err: AxiosError) => {
			throw err;
		});
};

export const adminLogin = async (values: ILoginAdmin) => {
	return api
		.post("/admin", { ...values, action: "login" })
		.then((resp) => {
			const response = resp.data;

			const accessToken = response.accessToken;
			const id = response.admin.id;

			if (response.accessToken) {
				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("adminId", id);
				setLocalStorage("accessToken", accessToken);
				setLocalStorage("adminId", id);
			}

			return response;
		})
		.catch((err: AxiosError) => {
			throw err;
		});
};
