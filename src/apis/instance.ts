import axios, { AxiosError, AxiosResponse } from 'axios';
import { removeCookie } from 'src/utils/cookieUtils';

const baseURL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
// 서버가 Set-Cookie 헤더를 통해 accessToken과 refreshToken을 전달하고 있으므로 withCredentials: true 방식을 사용
// 브라우저가 자동으로 Set-Cookie 헤더를 받아서 쿠키를 저장, 모든 요청에 이 쿠키들을 자동으로 포함


// 로그아웃 처리 함수
const handleLogout = () => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  window.location.href = '/signin';
};

// 쿠키는 자동으로 요청에 포함되므로, request 인터셉터에서 별도의 Authorization 헤더 설정이 필요 없음

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
        await instance.post('/auth/token/reissue');
        // 서버가 Set-Cookie 헤더로 새 토큰을 보내면 브라우저가 자동으로 쿠키를 저장
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


