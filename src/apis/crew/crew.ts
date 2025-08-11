import { AxiosError } from "axios";
import { ApiErrorResponse } from "../api.type";
import instance from "../instance";
import {
  CheckCrewNameResponse,
  CowalkCommentResponse,
  CowalkResponse,
  Cowalkwithcrew,
  CreateCrewRequest,
  CreateCrewResponse,
  CrewData,
  CrewDetailInfo,
  CrewRankingItem,
  MyCrewFeedResponse,
  MyCrewsResponse,
  RecommendedCrewsResponse,
  RecruitCowalker,
  UploadCrewImageResponse,
  UserCowalkList,
  WriteComment,
} from "./crew.type";

// 크루 피드 목록 조회 api
export const getCrewfeedlist = async ({
  crewId,
  size = 10,
  lastId,
}: {
  crewId: number;
  size?: number;
  lastId?: number;
}): Promise<MyCrewFeedResponse> => {
  const params: Record<string, any> = { crewId, size };
  if (lastId) params.lastId = lastId;

  try {
    const { data } = await instance.get(`/crews/${crewId}/feeds`, {
      params,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "피드 조회에 실패했습니다."
    );
  }
};

// 이름 중복 체크 api
export const checkCrewName = async (
  name: string,
): Promise<boolean> => {
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
//크루 정보 수정 api
export const modifyCrew = async (
  crewId: number,
  body: {
    name: string;
    description: string;
    rule: string;
    visibility: "PUBLIC" | "PRIVATE";
    password?: string;
    memberLimit?: number;
    crewImageId?: number;
  }
): Promise<void> => {
  try {
    await instance.put(`/crews/${crewId}`, body);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "크루 정보 수정에 실패했습니다."
    );
  }
};
//같이 산책 목록 조회 api
export const getCowalkList = async ({
  crewId,
  lastId,
  size = 10,
}: {
  crewId: number;
  lastId?: number;
  size?: number;
}): Promise<CowalkResponse> => {
  const params: Record<string, any> = { crewId, size };
  if (lastId) params.lastId = lastId;
  try {
    const { data } = await instance.get(`/crews/${crewId}/cowalk`, { params });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "같이 산책 목록 조회에 실패했습니다."
    );
  }
};

//같이 산책 생성 api
export const createCowalk = async ({
  crewId,
  ...rest
}: { crewId: number } & RecruitCowalker): Promise<number> => {
  try {
    const { data } = await instance.post<{ cowalkId: number }>(
      `crews/${crewId}/cowalk`,
      rest
    );
    return data.cowalkId;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "같이 산책 생성에 실패했습니다."
    );
  }
};

//같이 산책 목록 상세조회 api
export const getCowalkDetailList = async ({
  crewId,
  cowalkId,
}: {
  crewId: number;
  cowalkId: number;
}): Promise<Cowalkwithcrew> => {
  try {
    const { data } = await instance.get(`/crews/${crewId}/cowalk/${cowalkId}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "같이 산책 목록 상세 조회에 실패했습니다."
    );
  }
};

//같이 산책 댓글 목록 api
export const getCowalkCommentList = async ({
  crewId,
  cowalkId,
}: {
  crewId: number;
  cowalkId: number;
}): Promise<CowalkCommentResponse> => {
  try {
    const { data } = await instance.get(
      `/crews/${crewId}/cowalk/${cowalkId}/comments`
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "같이 산책 댓글 목록 조회에 실패했습니다."
    );
  }
};

//같이 산책 댓글 작성 api
export const createCowalkComment = async ({
  crewId,
  cowalkId,
  content,
}: {
  crewId: number;
  cowalkId: number;
  content: string;
}): Promise<WriteComment> => {
  try {
    const { data } = await instance.post(
      `/crews/${crewId}/cowalk/${cowalkId}/comments`,
      { content }
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "같이 산책 댓글 등록에 실패했습니다."
    );
  }
};

export const joinCowalk = async ({
  crewId,
  cowalkId,
}: {
  crewId: number;
  cowalkId: number;
}): Promise<void> => {
  try {
    await instance.post(`/crews/${crewId}/cowalk/${cowalkId}/join`);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "같이 산책 참여에 실패했습니다."
    );
  }
};

export const getUserCowalkList = async (): Promise<UserCowalkList> => {
  try {
    const { data } = await instance.get<UserCowalkList>(`/users/cowalk`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "사용자 같이 산책 목록 조회에 실패했습니다."
    );
  }
};
