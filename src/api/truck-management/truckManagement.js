import { api } from "@/utils/api.util";

export const getListTruck = async (payload) => {
  const result = await api("get", "/api/v1/truck", payload);
  return result;
};

export const getTruckManagementFromTruckId = async (truck_id) => {
  const result = await api("get", `/api/v1/truck_management/${truck_id}`);
  return result;
};
