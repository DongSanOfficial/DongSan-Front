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
  walkwayId: number;
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
  marked: boolean;
  likeCount: number;
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

// 수정 타입
export interface UpdateWalkwayType {
  name: string;
  memo: string;
  hashtags: string[];
  exposeLevel: "PRIVATE" | "PUBLIC";
}

// 등록한 산책로 조회
export interface Trail {
  walkwayId: number;
  name: string;
  date: string;
  distance: number;
  courseImageUrl: string;
  time: number;
  memo: string;
  likeCount: number;
  reviewCount: number;
  rating: number;
  hashtags: string[];
}

export interface FetchWalkwaysOptions {
  size?: number;
  lastId?: number;
  preview?: boolean;
}

export interface MyWalkwaysResponse {
  walkways: Trail[];
  hasNext: boolean;
}

export type MyWalkwaysApiResponse = ApiResponseFormat<MyWalkwaysResponse>;

// 이용한 산책로 내역
export interface WalkwayHistoryResponse {
  walkwayHistoryId: number;
}