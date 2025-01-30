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
    hashTags: string[];
    accessLevel: "PRIVATE" | "PUBLIC";
    course: Location[];
  }

export type WalkwayDetailResponse = ApiResponseFormat<WalkwayDetail>;

