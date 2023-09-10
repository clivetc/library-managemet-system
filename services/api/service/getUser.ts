import { api } from "../apiClient";
import { AxiosError } from "axios";

export const getUserById = async (id: string | null) => {
  return api.get(`user/${id}`).then((res) => res.data);
};
