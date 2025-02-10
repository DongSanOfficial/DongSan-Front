import {
  ReviewContentType,
  ReviewRatingType,
  UserReviewsType,
  walkwayHistoryType,
  WriteReviewType,
} from "./review.type";
import { ApiResponseFormat } from "./api.type";
import instance from "./instance";

// 작성한 리뷰 전체보기 api
export const getUserReviews = async ({
  size,
  lastId,
}: {
  size: number;
  lastId?: number;
}): Promise<{
  reviews: UserReviewsType[];
  hasNext: boolean;
}> => {
  try {
    const response = await instance.get<
      ApiResponseFormat<{ reviews: UserReviewsType[]; hasNext: boolean }>
    >("/users/reviews", {
      params: { size, lastId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 산책로 리뷰 별점보기 api
export const showReviewRating = async (
  walkwayId: string
): Promise<ReviewRatingType> => {
  try {
    const response = await instance.get<ApiResponseFormat<ReviewRatingType>>(
      `/walkways/${walkwayId}/review/rating`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 산책로 리뷰 내용보기 api
export const showReviewContent = async (
  walkwayId: string,
  sort: string
): Promise<{
  reviews: ReviewContentType[];
}> => {
  try {
    const response = await instance.get<
      ApiResponseFormat<{ reviews: ReviewContentType[] }>
    >(`/walkways/${walkwayId}/review/content?sort=${sort}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 리뷰 작성하기 api
export const writingReview = async (
  walkwayId: number,
  reviewData: WriteReviewType
): Promise<WriteReviewType> => {
  try {
    const response = await instance.post<WriteReviewType>(
      `/walkways/${walkwayId}/review`,
      reviewData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//리뷰 작성 가능한 산책로 이용기록 보기
export const writeableReviewRecord = async (
  walkwayId: number
): Promise<walkwayHistoryType> => {
  try {
    const response = await instance.get(`/walkways/${walkwayId}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
