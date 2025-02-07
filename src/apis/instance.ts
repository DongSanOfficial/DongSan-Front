import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie, removeCookie } from "src/utils/cookieUtils";
import { refreshTokens } from "./auth";

const baseURL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// const handleLogout = async () => {
//   try {
//     // 로그아웃 API 호출
//     await instance.delete("/auth/logout");
//   } catch (error) {
//     console.error("로그아웃 API 호출 실패:", error);
//     // API 호출 실패 시에도 토큰 제거
//     removeCookie("access_token");
//     removeCookie("refresh_token");
//   } finally {
//     window.location.href = "/signin";
//   }
// };

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
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    const config = originalRequest as RetryConfig & typeof originalRequest;

    if (originalRequest.url === "/auth/refresh") {
      // handleLogout();
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        console.log("리프레시 토큰: ", refreshToken);
        if (!refreshToken) throw new Error("리프레시 토큰이 없음");

        const success = await refreshTokens(refreshToken);
        if (success) {
          const newAccessToken = getCookie("accessToken");
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
        throw new Error("토큰 리프레시 실패");
      } catch (refreshError) {
        console.error("토큰 리프레시 실패", refreshError);
        // handleLogout();
        return Promise.reject("로그아웃되었습니다. 다시 로그인 해주세요.");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;