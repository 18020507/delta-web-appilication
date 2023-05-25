import { api } from "@/utils/api.util";

export const getListTruck = async (payload) => {
  const result = await api("get", "/api/v1/truck", payload);
  return result;
};

export const getTruckManagementFromTruckId = async (truck_id) => {
  const result = await api("get", `/api/v1/truck_management/${truck_id}`);
  return result;
};

export const getHandoverManagement = async (payload) => {
  const result = await api("get", "/api/v1/truck_management", payload);
  return result;
};

export const getTruckNotRegister = async () => {
  const result = await api("get", "/api/v1/truck_not_manage");
  return result;
};

export const getDriverNotRegister = async () => {
  const result = await api("get", "/api/v1/driver_not_manage");
  return result;
};

export const createTruckManagement = async (payload) => {
  const result = await api("post", "/api/v1/truck_management", payload);
  return result;
};
