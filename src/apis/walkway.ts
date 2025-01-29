import instance from "src/apis/instance";
import { WalkwayParams, WalkwaysApiResponse } from "./walkway.type";

/**
 * 산책로 검색 api 연동
 * @param params - 검색 파라미터
 * @returns Promise<WalkwaysResponse>
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
    console.error("산책로 검색 실패:", error);
    throw error;
  }
};
