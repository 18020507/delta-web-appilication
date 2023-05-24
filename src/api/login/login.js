import { addAuthHeader, api } from "@/utils/api.util";

export const login = async (payload) => {
  const result = await api("post", "/api/v1/login", payload);
  if (result.success) {
    localStorage.setItem("access_token", result.data.access_token);
    addAuthHeader();
  }
  return result;
};

export const getUserDetail = async () => {
  const result = await api("get", "/api/v1/user_detail");

  return result
};
