import { setCookie } from "src/utils/cookieUtils";
import { ApiResponseFormat } from "./api.type";
import { AuthResponse, UserProfileType } from "./auth.type";
import instance from "./instance";

//유저 프로필 조회 api
export const getUserProfile = async (): Promise<UserProfileType> => {
  try {
    const response = await instance.get<ApiResponseFormat<UserProfileType>>(
      '/users/profile'
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

//리프레시
export const refreshTokens = async (refreshToken: string): Promise<boolean> => {
  const response = await instance.post<ApiResponseFormat<AuthResponse>>(
    "/auth/refresh",
    { refreshToken }
  );
  if (response.data.isSuccess) {
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", newRefreshToken);
    return true;
  }
  return false;
};
