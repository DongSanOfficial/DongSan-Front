import {
  AddBookmarkRequest,
  AddBookmarkResponse,
  addToBookmark,
} from "./bookmark.type";
import instance from "./instance";

//*/ 북마크 생성 api
export const AddToBookmark = async (
  params: AddBookmarkRequest
): Promise<AddBookmarkResponse> => {
  try {
    const response = await instance.post
      <AddBookmarkResponse>
    (`/bookmarks`, params);
    return response.data;
  } catch (error) {
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
    const response = await instance.post<addToBookmark>(
      `/bookmarks/${bookmarkId}/walkways`,
      { walkwayId }
    );
    return response.data;
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
    const response = await instance.delete(
      `/bookmarks/${bookmarkId}/walkways/${walkwayId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
