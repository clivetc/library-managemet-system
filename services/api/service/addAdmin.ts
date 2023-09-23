import { AxiosError } from "axios";
import { api } from "../apiClient";

interface IValues {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  isAdmin: boolean;
}

export const addAdmin = async (values: IValues) => {
  return api
    .post("/admin", { ...values, action: "addAdmin" })
    .then((resp) => {
      const response = resp.data;

      return response;
    })
    .catch((err: AxiosError) => {
      throw err;
    });
};

export const getAdmin = async () => {
  return await api.get("/admin").then((res) => res.data);
};
