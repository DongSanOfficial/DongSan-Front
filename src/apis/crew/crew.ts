import { AxiosError } from "axios";
import { ApiErrorResponse } from "../api.type";
import instance from "../instance";
import { CheckCrewNameResponse, CreateCrewRequest, CreateCrewResponse, CrewListParams, CrewListResponse, feedList, UploadCrewImageResponse } from "./crew.type";


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
export const uploadCrewImage = async (crewImage: File): Promise<UploadCrewImageResponse> => {
  const formData = new FormData();
  formData.append("crewImage", crewImage);

  const { data } = await instance.post<UploadCrewImageResponse>("/crews/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

// 크루 생성 api
export const createCrew = async (body: CreateCrewRequest): Promise<number> => {
  const { data } = await instance.post<CreateCrewResponse>("/crews", body);
  return data.crewId;
};