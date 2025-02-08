import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie, removeCookie } from "src/utils/cookieUtils";
import { refreshTokens } from "./auth";
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


// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface RetryConfig {
  _retry?: boolean;
}

// 응답 인터셉터
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    const config = originalRequest as RetryConfig & typeof originalRequest;

    if (originalRequest.url === "/auth/refresh") {
      const errorData = error.response?.data as ApiErrorResponse;
      if (errorData.code === 'AUTH-005') {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        alert("로그인 세션이 만료되었습니다. 로그인 후 다시 시도해주세요.");
        window.location.href = "/signin";
      }
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = getCookie("refreshToken");
          if (!refreshToken) throw new Error("리프레시 토큰이 없음");

          const success = await refreshTokens(refreshToken);
          if (success) {
            const newAccessToken = getCookie("accessToken");
            refreshSubscribers.forEach(callback => callback(newAccessToken));
            refreshSubscribers = [];
            return instance(originalRequest);
          }
          throw new Error("토큰 리프레시 실패");
        } catch (refreshError) {
          removeCookie("accessToken");
          removeCookie("refreshToken");
          alert("로그인 세션이 만료되었습니다. 로그인 후 다시 시도해주세요.");
          window.location.href = "/signin";
          return Promise.reject("로그아웃되었습니다. 다시 로그인 해주세요.");
        } finally {
          isRefreshing = false;
        }
      } else {
        // 이미 토큰 갱신 중이면 대기
        return new Promise(resolve => {
          refreshSubscribers.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;