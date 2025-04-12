import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiErrorResponse } from "./api.type";

const baseURL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response) {
    const errorData = error.response.data as ApiErrorResponse;
    if (errorData?.code === "AUTH-01") {
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
}
);

export default instance;