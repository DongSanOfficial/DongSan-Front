import { UserReviewsType } from "./review.type";
import { ApiResponseFormat } from "./api.type";
import instance from "./instance";

// 작성한 리뷰 전체보기 api
export const getUserReviews = async (): Promise<{
  reviews: UserReviewsType[];
}> => {
  try {
    const response = await instance.get<
      ApiResponseFormat<{ reviews: UserReviewsType[] }>
    >("/users/reviews");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
