import { AxiosError } from "axios";
import { ApiErrorResponse } from "../api.type";
import instance from "../instance";
import { feedList } from "./crew.type";

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
