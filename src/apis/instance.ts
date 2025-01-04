import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookie, removeCookie } from 'src/utils/cookieUtils';

const baseURL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 로그아웃 처리 함수
const handleLogout = () => {
  removeCookie('access_token');
  removeCookie('refresh_token');
  window.location.href = '/signin';
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('access_token');    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    interface RetryConfig {
      _retry?: boolean;
    }
    const config = originalRequest as RetryConfig & typeof originalRequest;

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      
      try {
        // await instance.post('/auth/token/reissue');
        // reissue api 배포 전(주석 제거하면 에러남)
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 리프레시 실패', refreshError);
        handleLogout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;