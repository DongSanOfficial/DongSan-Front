export interface MyCrewFeedResponse {
  data: feedList[];
  hasNext: boolean;
}
export interface feedList {
  memberId?: number;
  walkwayHistoryId?: number;
  nickname: string;
  date?: string;
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
  managerNickname: string;
  crewImageId: number;
}

export interface ModifyCrewInfo {
  crewId: number;
  name: string;
  description: string;
  rule: string;
  visibility: CrewVisibility;
  password?: string;
  memberLimit: number;
  crewImageId: number;
}
// 크루 랭킹 아이템 타입
export interface CrewRankingItem {
  memberId: number;
  nickname: string;
  distanceKm: number;
  durationHour: number;
}

export interface CowalkResponse {
  data: Cowalkwithcrew[];
  hasNext: boolean;
}
//같이 산책 목록
export interface Cowalkwithcrew {
  cowalkId: number;
  profileImageUrl: string;
  nickname: string;
  createdDate: string;
  date: string;
  time: string;
  endTime: string;
  limitEnable: boolean;
  memberCount: number;
  memberLimit: number;
  content: string;
  commentCount: number;
  memo: string;
}
//같이 산책 생성
export interface RecruitCowalker {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  limitEnable: boolean;
  memberLimit?: number;
  memo: string;
}
export interface RecruitCowalkerResponse {
  cowalkId: number;
}

//같이 산책 댓글 작성
export interface CowalkComment {
  commentId?: number;
  profileImageUrl: string;
  nickname: string;
  createdDate: string;
  content: string;
}
export interface CowalkCommentResponse {
  data: CowalkComment[];
  hasNext: boolean;
}

//댓글 작성
export interface WriteComment {
  content: string;
}

export interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface UserCowalk {
  cowalkId: number;
  startedAt: string;
  endedAt: string;
}

export interface UserCowalkList {
  data: UserCowalk[];
  hasNext: boolean;
}
