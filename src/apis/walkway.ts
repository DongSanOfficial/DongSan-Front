import instance from "src/apis/instance";
import {
  WalkwayParams,
  CreateWalkwayType,
  UpdateWalkwayType,
  MyWalkwaysResponse,
  FetchWalkwaysOptions,
  WalkwayHistoryResponse,
  WalkwaysResponse,
  WalkwayDetail,
} from "./walkway.type";
import { ApiErrorResponse } from "src/apis/api.type";
import { AxiosError } from "axios";

/**
 * 산책로 검색 API 호출
 */
export const searchWalkways = async (params: WalkwayParams) => {
  try {
    const { data: response } = await instance.get<WalkwaysResponse>(
      "/walkways",
      {
        params: {
          sort: params.sort,
          latitude: params.latitude,
          longitude: params.longitude,
          distance: params.distance,
          lastId: params.lastId,
          size: params.size || 10,
        },
      }
    );

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "산책로 검색에 실패했습니다."
    );
  }
};

/**
 * 산책로 단건 조회 API 호출
 */
export const getWalkwayDetail = async (walkwayId: number) => {
  try {
    const { data: response } = await instance.get<WalkwayDetail>(
      `/walkways/${walkwayId}`
    );

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "산책로 상세 조회에 실패했습니다."
    );
  }
};

/**
 * 산책로 코스 이미지 등록 API 호출
 */
export const uploadCourseImage = async (courseImage: File) => {
  try {
    const formData = new FormData();
    formData.append("courseImage", courseImage);

    const { data: response } = await instance.post
      <{ courseImageId: number }>
    ("/walkways/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.courseImageId;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "이미지 등록에 실패했습니다."
    );
  }
};

/**
 * 산책로 등록 API 호출
 */
export const createWalkway = async (walkwayData: CreateWalkwayType) => {
  try {
    const { data: response } = await instance.post<{ walkwayId: number }>
    ("/walkways", walkwayData);
    return response.walkwayId;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "산책로 등록에 실패했습니다."
    );
  }
};

/**
 * 산책로 수정 API 호출
 */
export const updateWalkway = async (
  walkwayId: number,
  walkwayData: UpdateWalkwayType
) => {
  try {
    const response = await instance.put<number>(
      `/walkways/${walkwayId}`,
      walkwayData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "등록한 산책로 수정에 실패했습니다."
    );
  }
};

/**
 * 등록한 산책로 조회 API 호출
 */
export const getMyWalkways = async ({
  size = 10,
  lastId,
  preview = false,
}: FetchWalkwaysOptions = {}): Promise<MyWalkwaysResponse> => {
  try {
    const { data: response } = await instance.get<MyWalkwaysResponse>(
      "/users/walkways/upload",
      {
        params: {
          size: preview ? 3 : size, // preview면 3개만(마이페이지 프리뷰로 보여줄 것), 아니면 요청된 size
          lastId,
        },
      }
    );

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "등록한 산책로 조회에 실패했습니다."
    );
  }
};

/**
* 산책로 이용기록 전송 API 호출
* @param walkwayId - 산책로 ID 
* @param historyData - 산책 이용 데이터 
* @returns {WalkwayHistoryResponse} 
* - walkwayHistoryId: 리뷰작성 가능 여부와 상관없이 history Id는 항상 반환됨
* - canReview: 리뷰작성 가능 여부
*/
export const createWalkwayHistory = async (
  walkwayId: number,
  historyData: { time: number; distance: number }
) => {
  try {
    const { data: response } = await instance.post
      <WalkwayHistoryResponse>
    (`/walkways/${walkwayId}/history`, historyData);

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "산책로 이용 기록 등록에 실패했습니다."
    );
  }
};

