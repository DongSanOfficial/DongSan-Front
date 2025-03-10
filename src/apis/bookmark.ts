import {
  AddBookmarkRequest,
  AddBookmarkResponse,
  addToBookmark,
  deleteBookmarkRequest,
  getBookmarkResponse,
  putBookmarkRequest,
} from "./bookmark.type";
import instance from "./instance";

// 북마크 생성 api
export const AddToBookmark = async (
  params: AddBookmarkRequest
): Promise<AddBookmarkResponse> => {
  try {
    const response = await instance.post<AddBookmarkResponse>(
      `/bookmarks`,
      params
    );
    return response.data;
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
    const response = await instance.get<getBookmarkResponse>(
      `/walkways/${walkwayId}/bookmarks`,
      {
        params: {
          lastId: lastId,
          size: size,
        },
      }
    );
    console.log("walkwayId:", walkwayId);
    return response.data;
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

//북마크 수정

export const putBookmarkName = async ({
  bookmarkId,
  name,
}: {
  bookmarkId: number;
  name: string;
}): Promise<{}> => {
  try {
    const response = await instance.put<ApiResponseFormat<putBookmarkRequest>>(
      `/bookmarks/${bookmarkId}`,
      { name }
    );
    console.log("북마크 아이디 : ", bookmarkId);
    return response;
  } catch (error) {
    throw error;
  }
};

// 북마크 삭제
export const deleteBookmarkName = async ({
  bookmarkId,
}: {
  bookmarkId: number;
}): Promise<{}> => {
  console.log("deleteBookmarkName 함수 시작, bookmarkId:", bookmarkId);
  try {
    console.log("API 호출 시도");
    const response = await instance.delete<ApiResponseFormat<{}>>(
      `/bookmarks/${bookmarkId}`
    );

    console.log("북마크 삭제 성공:", response);
    return response;
  } catch (error) {
    console.error("북마크 삭제 에러 상세:", error);
    throw error;
  }
};
