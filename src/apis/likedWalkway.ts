import instance from "./instance";
import { likedWalkwayType } from "./likedWalkway.type";

export const toggleLike = async ({
  walkwayId,
  isLiked,
}: likedWalkwayType & {
  isLiked: boolean;
}): Promise<{}> => {
  try {
    const response = isLiked //하트에 따라 처리
      ? await instance.delete( //산책로 좋아요 취소 api
          `/walkways/${walkwayId}/likes`
        )
      : await instance.post( //산책로 좋아요 선택 api
          `/walkways/${walkwayId}/likes`
        );
    return response;
  } catch (error) {
    console.error("Failed to toggle like:", error);
    throw error;
  }
};
