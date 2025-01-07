import { ApiResponseFormat } from "./api.type";
import instance from "./instance";
import { likedWalkwayType } from "./likedWalkway.type";

export const clickLiked = async ({
  walkwayId,
}: likedWalkwayType): Promise<{}> => {
  try {
    const response = await instance.post<ApiResponseFormat<{}>>(
      `/walkways/${walkwayId}/likes`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
