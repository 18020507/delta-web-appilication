import { api } from "@/utils/api.util";

export const getAccountDetail = async () => {
  const result = await api("get", "/api/v1/user_detail");

  return result;
};

export const updateAccount = async (payload) => {
  const result = await api("post", "/api/v1/update_account", payload);

  return result;
};

export const updateAvatar = async (payload) => {
  const result = await api("post", "/api/v1/modify_image", payload);

  return result;
};
