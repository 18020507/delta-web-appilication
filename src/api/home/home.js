import { api } from "@/utils/api.util";

export const getNotification = async (user_id) => {
  const result = await api("get", `/api/v1/notification/${user_id}`);
  return result;
};
