export interface MyCrewFeedResponse {
  data: feedList[];
  hasNext: boolean;
}
export interface feedList {
  walkwayHistoryId?: number;
  nickname: string;
  date: string;
  distanceKm: number;
  durationSec?: number;
}
// 크루 생성
export type CrewVisibility = "PUBLIC" | "PRIVATE";

export interface CheckCrewNameResponse {
  isValid: boolean;
}

export interface UploadCrewImageResponse {
  crewImageId: number;
  imageUrl: string;
}

export interface CreateCrewRequest {
  name: string;
  description: string;
  rule: string;
  visibility: CrewVisibility;
  password?: string;
  limitEnable: boolean;
  memberLimit?: number;
  crewImageId?: number;
}

export interface CreateCrewResponse {
  crewId: number;
}

export interface CrewData {
  crewId: number;
  name: string;
  description: string;
  rule: string;
  visibility: CrewVisibility;
  limitEnable: boolean;
  memberLimit: number;
  memberCount: number;
  crewImageUrl: string;
  createdAt: string;
  isManager?: boolean;
  isJoined: boolean;
}

export interface MyCrewsResponse {
  data: CrewData[];
  hasNext: boolean;
}

export interface RecommendedCrewsResponse {
  data: CrewData[];
  hasNext: boolean;
}

// 단일 크루 정보 타입
export interface WeeklyStats {
  distanceKm: number;
  durationHour: number;
}

export interface CrewDetailInfo {
  crewId: number;
  name: string;
  description: string;
  rule: string;
  visibility: CrewVisibility;
  limitEnable: boolean;
  memberCount: number;
  memberLimit: number;
  crewImageUrl: string;
  createdAt: string;
  weeklyStats: WeeklyStats;
  isJoined: boolean;
}

// 크루 랭킹 아이템 타입
export interface CrewRankingItem {
  memberId: number;
  nickname: string;
  distanceKm: number;
  durationHour: number;
}
