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