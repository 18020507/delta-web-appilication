import { api } from "@/utils/api.util";

export const getListRole = async () => {
  const result = await api("get", "/api/v1/role");
  return result;
};