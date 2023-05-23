import { api } from "@/utils/api.util";

export const getRequest = async (payload) => {
  const result = await api("get", "/api/v1/request", payload);
  return result;
};

export const getDriverName = async () => {
  const result = await api("get", "/api/v1/driver_name");
  return result;
};

export const getLicensePlate = async () => {
  const result = await api("get", "/api/v1/license_plate");
  return result;
};

export const getRequestDetail = async (request_id) => {
  const result = await api("get", `/api/v1/request_detail/${request_id}`);
  return result;
};

export const getSceneImage = async (payload) => {
  const result = await api("get", "/api/v1/image", payload);
  return result;
};

export const updateRequest = async (payload) => {
  const result = await api("put", "/api/v1/request", payload);
  return result;
};

export const createRequest = async (payload) => {
  const result = await api("post", "/api/v1/request", payload);
  return result;
};
