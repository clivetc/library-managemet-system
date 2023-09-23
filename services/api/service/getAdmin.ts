import { api } from "../apiClient";
import { AxiosError } from "axios";

export const getAdminById = async (id: string) => {
  return api.get(`admin/${id}`).then((res) => res.data);
};
