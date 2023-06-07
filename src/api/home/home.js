import { api } from "@/utils/api.util";

export const getNotification = async (user_id) => {
  const result = await api("get", `/api/v1/notification/${user_id}`);
  return result;
};

export const getStatisticSummary = async () => {
  const result = await api("get", "/api/v1/statistical");
  return result;
};

export const getStatisticByMonth = async (month) => {
  const result = await api("get", `/api/v1/statistical/${month}`);
  return result;
};
