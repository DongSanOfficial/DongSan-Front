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

const handleLogout = async () => {
  try {
    // 로그아웃 API 호출
    await instance.delete("/auth/logout");
  } catch (error) {
    console.error("로그아웃 API 호출 실패:", error);
    // API 호출 실패 시에도 토큰 제거
    removeCookie("accessToken");
    removeCookie("refreshToken");
  } finally {
    window.location.href = "/signin";
  }
};

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

    // 401 에러이고 아직 재시도하지 않은 경우에만 토큰 갱신 시도
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          console.log("리프레시 토큰이 없음");
          handleLogout();
          return Promise.reject("로그인이 필요합니다.");
        }

        const success = await refreshTokens(refreshToken);
        if (success) {
          const newAccessToken = getCookie("accessToken");
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }

        // 토큰 갱신 실패
        handleLogout();
        return Promise.reject("세션이 만료되었습니다. 다시 로그인해 주세요.");
      } catch (refreshError) {
        // 토큰 갱신 과정에서 에러 발생
        if (axios.isAxiosError(refreshError)) {
          if (refreshError.response?.status === 401) {
            // 리프레시 토큰이 만료된 경우
            handleLogout();
            return Promise.reject("세션이 만료되었습니다. 다시 로그인해 주세요.");
          }
          return Promise.reject("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
        console.error("토큰 갱신 중 오류 발생:", refreshError);
        return Promise.reject("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    }

    // 401 이외의 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default instance;
