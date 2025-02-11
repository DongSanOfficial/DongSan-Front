export interface UserReviewsType {
  //내가 작성한 리뷰 전체보기
  reviewId: number;
  walkwayId: number;
  walkwayName: string;
  date: string;
  rating: number;
  content: string;
}

export interface ReviewRatingType {
  //산책로 리뷰 별점보기
  rating: number;
  reviewCount: number;
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}
export interface ReviewContentType {
  //산책로 리뷰 내용보기
  reviewId: number;
  nickname: string;
  date: string;
  period: string;
  rating: number; //?
  content: string;
}

export interface WriteReviewType {
  //리뷰 작성하기
  walkwayHistoryId: number;
  rating: number;
  content: string;
}

export interface walkwayHistoryType {
  //리뷰작성가능한 산책로
  walkwayHistoryId: number;
  walkwayId: number;
  name: string;
  date: string;
  time: number;
  distance: number;
  courseImageUrl: string;
}

export interface walkwayHistoryResponse {
  walkwayHistories: walkwayHistoryType[];
}
