import { ApiResponseFormat } from "./api.type";
import {
  AddBookmarkRequest,
  AddBookmarkResponse,
  addToBookmark,
  getBookmarkResponse,
} from "./bookmark.type";
import instance from "./instance";

// 북마크 생성 api
export const AddToBookmark = async (
  params: AddBookmarkRequest
): Promise<AddBookmarkResponse> => {
  try {
    const response = await instance.post<
      ApiResponseFormat<AddBookmarkResponse>
    >(`/bookmarks`, params);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// 북마크 조회 api
export const getBookmark = async ({
  walkwayId,
  lastId,
  size,
}: {
  walkwayId: number;
  lastId?: number;
  size: number;
}): Promise<getBookmarkResponse> => {
  try {
    const response = await instance.get<ApiResponseFormat<getBookmarkResponse>>(
      `/walkways/${walkwayId}/bookmarks`,
      {
        params: {
          lastId: lastId,
          size: size,
        },
      }
    );
    console.log("walkwayId:", walkwayId);
    return response.data.data;
  } catch (error) {
    console.error("북마크 조회함수 에러:", error);
    throw error;
  }
};

export const SaveToBookmark = async ({
  //북마크에 산책로를 추가 api(북마크 저장)
  bookmarkId,
  walkwayId,
}: {
  bookmarkId: number;
  walkwayId: number;
}): Promise<addToBookmark> => {
  try {
    const response = await instance.post<ApiResponseFormat<addToBookmark>>(
      `/bookmarks/${bookmarkId}/walkways`,
      { walkwayId }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveToBookmark = async ({
  //북마크에 산책로를 제거 api
  bookmarkId,
  walkwayId,
}: {
  bookmarkId: number;
  walkwayId: number;
}): Promise<{}> => {
  try {
    const response = await instance.delete<ApiResponseFormat<{}>>(
      `/bookmarks/${bookmarkId}/walkways/${walkwayId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
