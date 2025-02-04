import instance from "src/apis/instance";
import {
  WalkwayParams,
  WalkwaysApiResponse,
  WalkwayDetailResponse,
  CreateWalkwayType,
  UpdateWalkwayType,
  TrailsResponse,
  TrailsApiResponse,
} from "./walkway.type";
import { ApiErrorResponse, ApiResponseFormat } from "src/apis/api.type";
import { AxiosError } from "axios";

/**
 * 산책로 검색 API 호출
 */
export const searchWalkways = async (params: WalkwayParams) => {
  try {
    const { data: response } = await instance.get<WalkwaysApiResponse>(
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

    if (!response.isSuccess) {
      throw new Error(response.message);
    }

    return response.data;
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
    const { data: response } = await instance.get<WalkwayDetailResponse>(
      `/walkways/${walkwayId}`
    );

    if (!response.isSuccess) {
      throw new Error(response.message);
    }

    return response.data;
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

    const { data: response } = await instance.post<
      ApiResponseFormat<{ courseImageId: number }>
    >("/walkways/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.isSuccess) {
      throw new Error(response.message);
    }

    return response.data.courseImageId;
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
    const { data: response } = await instance.post<
      ApiResponseFormat<{ walkwayId: number }>
    >("/walkways", walkwayData);

    if (!response.isSuccess) {
      throw new Error(response.message);
    }

    return response.data.walkwayId;
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
    const response = await instance.put<ApiResponseFormat<number>>(
      `/walkways/${walkwayId}`,
      walkwayData
    );

    // 204 응답은 성공으로 처리
    if (response.status === 204) {
      return true;
    }

    // 200 응답 처리
    if (!response.data.isSuccess) {
      throw new Error(response.data.message);
    }

    return response.data.data;
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
export const getTrails = async (
  size: number = 10,
  lastId?: number
): Promise<TrailsResponse> => {
  try {
    const { data: response } = await instance.get<TrailsApiResponse>(
      "/users/walkways/upload",
      {
        params: {
          size,
          lastId,
        },
      }
    );

    if (!response.isSuccess) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "등록한 산책로 조회에 실패했습니다."
    );
  }
};
