import { AxiosError } from "axios";
import { ApiErrorResponse } from "../api.type";
import instance from "../instance";
import {
  CheckCrewNameResponse,
  CreateCrewRequest,
  CreateCrewResponse,
  CrewData,
  CrewDetailInfo,
  CrewRankingItem,
  feedList,
  MyCrewsResponse,
  RecommendedCrewsResponse,
  UploadCrewImageResponse,
} from "./crew.type";

export const getIsBookmarked = async ({
  crewId,
}: {
  crewId: number;
}): Promise<feedList> => {
  try {
    const { data: response } = await instance.get<feedList>(
      `/crews/${crewId}/feeds`
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "피드 조회에 실패했습니다."
    );
  }
};

// 이름 중복 체크 api
export const checkCrewName = async (name: string): Promise<boolean> => {
  const { data } = await instance.get<CheckCrewNameResponse>("/crews/exists", {
    params: { name },
  });
  return data.isValid;
};

// 이미지 업로드
export const uploadCrewImage = async (
  crewImage: File
): Promise<UploadCrewImageResponse> => {
  const formData = new FormData();
  formData.append("crewImage", crewImage);

  const { data } = await instance.post<UploadCrewImageResponse>(
    "/crews/image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};

// 크루 생성 api
export const createCrew = async (body: CreateCrewRequest): Promise<number> => {
  const { data } = await instance.post<CreateCrewResponse>("/crews", body);
  return data.crewId;
};

// 나의 크루 목록 조회 api
export const getMyCrews = async ({
  size = 10,
  lastId,
}: {
  size?: number;
  lastId?: number;
}): Promise<MyCrewsResponse> => {
  try {
    const params: { size: number; lastId?: number } = { size };
    if (lastId) {
      params.lastId = lastId;
    }

    const { data: response } = await instance.get<MyCrewsResponse>(
      "/users/crews",
      { params }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "나의 크루 조회에 실패했습니다."
    );
  }
};

// 추천 크루 목록 조회 api
export const getRecommendedCrews = async ({
  size = 10,
  lastId,
}: {
  size?: number;
  lastId?: number;
}): Promise<RecommendedCrewsResponse> => {
  try {
    const params: { size: number; lastId?: number } = { size };
    if (lastId) {
      params.lastId = lastId;
    }

    const { data: response } = await instance.get<RecommendedCrewsResponse>(
      "/crews/recommend",
      { params }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "추천 크루 조회에 실패했습니다."
    );
  }
};

// 단일 크루 정보 조회 api
export const getCrewDetail = async (
  crewId: number
): Promise<CrewDetailInfo> => {
  try {
    const { data: response } = await instance.get<CrewDetailInfo>(
      `/crews/${crewId}/info`
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "크루 정보 조회에 실패했습니다."
    );
  }
};

// 크루 검색 api
export const getSearchCrews = async ({
  name,
  size = 10,
  lastId,
}: {
  name: string;
  size?: number;
  lastId?: number;
}): Promise<{ data: CrewData[]; hasNext: boolean }> => {
  const params: Record<string, any> = { name, size };
  if (lastId) params.lastId = lastId;

  const { data: response } = await instance.get("/crews/search", { params });
  return response;
};

// 크루 가입 api
export const joinCrew = async ({
  crewId,
  password = null,
}: {
  crewId: number;
  password?: string | null;
}): Promise<void> => {
  try {
    await instance.post(`/crews/${crewId}/members`, {
      password,
    });
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "크루 가입에 실패했습니다."
    );
  }
};

// 크루 탈퇴 api
export const leaveCrew = async (crewId: number): Promise<void> => {
  try {
    await instance.delete(`/crews/${crewId}/members`);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "크루 탈퇴에 실패했습니다."
    );
  }
};

// 크루 랭킹 api
export const getCrewRanking = async (
  crewId: number,
  {
    period,
    date,
    sort,
    size = 10,
    lastId,
  }: {
    period: "daily" | "weekly" | "monthly";
    date: string;
    sort: "distance" | "duration";
    size?: number;
    lastId?: number;
  }
): Promise<{ data: CrewRankingItem[]; hasNext: boolean }> => {
  try {
    const params: Record<string, any> = { period, date, sort, size };
    if (lastId !== undefined) {
      params.lastId = lastId;
    }

    const { data: response } = await instance.get(`/crews/${crewId}/ranking`, {
      params,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "크루 랭킹 정보를 불러오는 데 실패했습니다."
    );
  }
};