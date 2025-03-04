import {
  ReviewContentType,
  ReviewRatingType,
  UserReviewsType,
  walkwayHistoryResponse,
  walkwayHistoryType,
  WriteReviewType,
} from "./review.type";
import instance from "./instance";

// 작성한 리뷰 전체보기 api
export const getUserReviews = async ({
  size,
  lastId,
}: {
  size: number;
  lastId?: number;
}): Promise<{
  data: UserReviewsType[];
  hasNext: boolean;
}> => {
  try {
    const response = await instance.get
      <{ data: UserReviewsType[]; hasNext: boolean }>
    ("/users/reviews", {
      params: { size, lastId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 산책로 리뷰 별점보기 api
export const showReviewRating = async (
  walkwayId: string
): Promise<ReviewRatingType> => {
  try {
    const response = await instance.get<ReviewRatingType>(
      `/walkways/${walkwayId}/review/rating`
    );
    return response.data;
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
    const response = await instance.get
    <{ reviews: ReviewContentType[] }
    >(`/walkways/${walkwayId}/review/content?sort=${sort}`);
    return response.data;
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
    console.error("리뷰 작성 실패:", error);
    throw error;
  }
};

//리뷰 작성 가능한 산책로 이용기록 보기
export const writeableReviewRecord = async (
  walkwayId: number
): Promise<walkwayHistoryType[]> => {
  try {
    const response = await instance.get<{ data: walkwayHistoryResponse }>(
      `/walkways/${walkwayId}/history`
    );
    return response.data.data.data;
  } catch (error) {
    throw error;
  }
};

//회원의 리뷰작성 가능한 산책로 이용기록 모두 보기(마이페이지)
export const getReviewRecord = async ({
  size,
  lastId,
}: {
  size: number;
  lastId?: number;
}): Promise<{
  data: walkwayHistoryType[];
}> => {
  try {
    const response = await instance.get<{
      data: walkwayHistoryType[];
    }>("/users/walkways/history", {
      params: { size, lastId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};