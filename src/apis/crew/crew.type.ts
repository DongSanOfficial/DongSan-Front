export interface feedList {
  id: number;
  nickname: string;
  date: number;
  distanceKm: number;
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
  crewImageId: number;
}

export interface CreateCrewResponse {
  crewId: number;
}
