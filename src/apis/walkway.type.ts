import { ApiResponseFormat } from "src/apis/api.type";

export interface Location {
  latitude: number;
  longitude: number;
}

// 검색 타입
export interface Walkway {
  walkwayId: number;
  name: string;
  distance: number;
  hashtags: string[];
  isLike: boolean;
  likeCount: number;
  reviewCount: number;
  rating: number;
  courseImageUrl: string;
  location: Location;
  registerDate?: string;
}

export interface WalkwaysResponse {
  walkways: Walkway[];
  hasNext: boolean;
}

export interface WalkwayParams {
  sort: "liked" | "rating";
  latitude: number;
  longitude: number;
  distance: number;
  lastId?: number | null;
  size?: number;
}

export type SortOption = "liked" | "rating";

export type WalkwaysApiResponse = ApiResponseFormat<WalkwaysResponse>;

// 디테일 조회 타입
export interface WalkwayDetail {
  date: string;
  time: number;
  distance: number;
  name: string;
  courseImageUrl: string;
  memo: string;
  rating: number;
  isLike: boolean;
  reviewCount: number;
  hashtags: string[];
  accessLevel: "PRIVATE" | "PUBLIC";
  isBookmarked: boolean;
  likeCount: number;
  // 서버에 좋아요수, 북마크 여부 추가되면 필드명 비교하기!
  course: Location[];
}

export type WalkwayDetailResponse = ApiResponseFormat<WalkwayDetail>;

// 등록 타입
export interface CreateWalkwayType {
  courseImageId: number;
  name: string;
  memo: string;
  distance: number;
  time: number;
  hashtags: string[];
  exposeLevel: "PRIVATE" | "PUBLIC";
  course: Array<{
    latitude: number;
    longitude: number;
  }>;
}
