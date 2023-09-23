import { api } from "../apiClient";

export const getAdminById = async (id: string) => {
  return api.get(`admin/${id}`).then((res) => res.data);
};
