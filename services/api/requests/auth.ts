import { ILogin, IRegister } from "@/types/interfaces";
import { api } from "../apiClient";

export const registerUser = async (values: IRegister) => {
  api.post("/register", values).then((resp) => resp.data);
};

export const loginUser = async (values: ILogin) => {
  api.post("/user", values).then((resp) => {
    const response = resp.data;
    if (response) {
      const accessToken = response.accessToken;
      const userId = response.accessToken.currentUser.id;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
    }
    console.log(response);
  });
};
