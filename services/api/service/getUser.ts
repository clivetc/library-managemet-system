import { api } from "../apiClient";
import { AxiosError } from "axios";

export const getUserById = async (id: string) => {
  return api.get(`user/${id}`).then((res) => res.data);
};
