import { ApiResponseFormat } from "./api.type";
import { addToBookmark } from "./bookmark.type";
import instance from "./instance";

export const SaveToBookmark = async ({
  //북마크에 산책로를 추가 api
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
