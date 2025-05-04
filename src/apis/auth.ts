import { UserProfileType } from "./auth.type";
import instance from "./instance";

//유저 프로필 조회 api
export const getUserProfile = async (): Promise<UserProfileType> => {
  try {
    const response = await instance.get<UserProfileType>(
      '/users/profile'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserNickname = async (nickname: string): Promise<void> => {
  try {
    const response = await instance.patch('/users/profile/nickname', {
      nickname: nickname
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};