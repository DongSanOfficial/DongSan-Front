export interface Location {
  latitude: number;
  longitude: number;
}

export interface Trail {
  walkwayId: number;
  name: string;
  date: string;
  distance: number;
  courseImageUrl: string;
  time?: number;
  memo?: string;
  likeCount: number;
  reviewCount: number;
  rating: number;
  hashtags: string[];
}

export interface WalkwayListResponse {
  data: Trail[];
  hasNext: boolean;
}

export interface MyWalkwaysResponse {
  data: Trail[];
  hasNext: boolean;
}

export interface BookmarkWalkwaysResponse {
  data: Trail[];
  hasNext: boolean;
}

export interface FetchWalkwaysOptions {
  size?: number;
  lastId?: number;
  preview?: boolean;
}

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
  data: Walkway[];
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

export interface AllWalkwayParams {
  sort: SortOption;
  lastId?: number | null;
  size?: number;
}

export type SortOption = "liked" | "rating";
export type MapOption = "all" | "current";

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
  isLiked: boolean;
  reviewCount: number;
  hashtags: string[];
  accessLevel: "PRIVATE" | "PUBLIC";
  marked: boolean;
  likeCount: number;
  course: Location[];
}

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

export interface UpdateWalkwayType {
  name: string;
  memo: string;
  hashtags: string[];
  exposeLevel: "PRIVATE" | "PUBLIC";
}

// 이용한 산책로 내역
export interface WalkwayHistoryResponse {
  walkwayHistoryId: number;
  canReview: boolean;
}
