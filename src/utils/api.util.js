import router from "@/router";
import axios from "axios";

export const addAuthHeader = () => {
  if (!localStorage.getItem("access_token")) return;
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const api = async (method, url, payload = null) => {
  try {
    // const urlSearchParams = new URLSearchParams(payload || {});
    const axiosPayload = {
      method,
      // url: `${url}${urlSearchParams.size !== 0 ? `?${urlSearchParams.toString()}` : ''}`,
      url: url,
    };
    if (payload) {
      if (method === "get") {
        axiosPayload.params = payload;
      } else {
        axiosPayload.data = payload;
      }
    }
    const response = await axios(axiosPayload);
    return processAxiosPayload(response);
  } catch (error) {
    const { response } = error;
    if (response.status === 403) {
      // window.location.href = "/login";
      router.push("/login");
      localStorage.removeItem("access_token");
    }
    return processAxiosPayload(error.response);
  }
};

export const processAxiosPayload = (payload) => {
  const result = {
    success: false,
    data: {},
  };
  const successCodes = [200];
  const failureCodes = [400, 404];
  if (successCodes.includes(payload.status)) {
    result.success = true;
  }
  if (failureCodes.includes(payload.status)) {
    result.success = false;
  }
  // Handle expired token error
  if (payload.status === 401) {
    localStorage.removeItem("access_token");
    router.push("/login");
    // window.location.href = "/";
  }
  result.status = payload.status;
  result.data = payload.data;
  return result;
};
