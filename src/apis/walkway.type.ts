import { ApiResponseFormat } from "./api.type";

export interface Location {
  latitude: number;
  longitude: number;
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

export interface WalkwaysApiResponse
  extends ApiResponseFormat<WalkwaysResponse> {}
