import { ILogin, IRegister } from "@/types/interfaces";
import { api } from "../apiClient";
import { AxiosError } from "axios";

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
    .post("/user", values)
    .then((resp) => {
      const response = resp.data;

      const accessToken = response.accessToken;
      const userId = response.currentUser.id;

      if (response.accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
      }

      return response;
    })
    .catch((err: AxiosError) => {
      throw err;
    });
};
