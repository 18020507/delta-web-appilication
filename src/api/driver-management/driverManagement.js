import { api } from "@/utils/api.util";

export const getListDriver = async (payload) => {
  const result = await api("get", "/api/v1/driver", payload);
  return result;
};

export const createDriverAccount = async (payload) => {
  const result = await api("post", "/api/v1/register", payload);
  return result;
};
