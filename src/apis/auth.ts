import { ApiResponseFormat } from './api.type';
import { UserProfileType } from './auth.type';
import instance from './instance';

//유저 프로필 조회 api
export const getUserProfile = async (): Promise<UserProfileType> => {
  try {
    const response = await instance.get<ApiResponseFormat<UserProfileType>>('/users/profile');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};