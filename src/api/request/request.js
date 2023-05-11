import { api } from "@/utils/api.util";

export const getRequest = async (payload) => {
  const result = await api("get", "/api/v1/request", payload);
  return result;
};


// import axios from "axios";
// export const getRequest = async (payload) => {
//   return await axios.get("/api/v1/request", payload);
// };
