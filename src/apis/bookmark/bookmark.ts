import instance from "../instance";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "../api.type";
import {
  AddBookmarkRequest,
  AddBookmarkResponse,
  getBookmarkTitleResponse,
  addToBookmark,
  putBookmarkRequest,
  getIsBookmarkedResponse,
} from "../bookmark/bookmark.type";
import { BookmarkWalkwaysResponse, WalkwayListResponse } from "../walkway/walkway.type";

// 북마크 생성 api
export const AddToBookmark = async (
  params: AddBookmarkRequest
): Promise<AddBookmarkResponse> => {
  try {
    const { data: response } = await instance.post<AddBookmarkResponse>(
      `/bookmarks`,
      params
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // 중복된 북마크 이름인 경우 에러 메시지 반환
    if (axiosError.response?.data?.code === "BOOKMARK-02") {
      throw new Error(
        "이름이 같은 북마크가 이미 존재합니다."
      );
    }
    
    throw new Error(
      axiosError.response?.data?.message || "북마크 생성에 실패했습니다."
    );
  }
};

// 마이페이지에서 북마크 제목 조회 api
export const getBookmarkTitle = async ({
  lastId,
  size,
}: {
  lastId?: number | null;
  size: number;
}): Promise<getBookmarkTitleResponse> => {
  try {
    const { data: response } = await instance.get<getBookmarkTitleResponse>(
      `/users/bookmarks/title`,
      {
        params: {
          lastId,
          size,
        },
      }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "북마크 목록 조회에 실패했습니다."
    );
  }
};


// 북마크 저장 시 리스트 조회 api
export const getIsBookmarked = async ({
  walkwayId,
  lastId,
  size,
}: {
  walkwayId: number;
  lastId?: number;
  size: number;
}): Promise<getIsBookmarkedResponse> => {
  try {
    const { data: response } = await instance.get<getIsBookmarkedResponse>(
      `/walkways/${walkwayId}/bookmarks`,
      {
        params: {
          lastId,
          size,
        },
      }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "북마크 목록 조회에 실패했습니다."
    );
  }
};

// 북마크에 산책로를 추가 api
export const SaveToBookmark = async ({
  bookmarkId,
  walkwayId,
}: {
  bookmarkId: number;
  walkwayId: number;
}): Promise<addToBookmark> => {
  try {
    const { data: response } = await instance.post<addToBookmark>(
      `/bookmarks/${bookmarkId}/walkways`,
      { walkwayId }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "북마크에 산책로 추가에 실패했습니다."
    );
  }
};

// 북마크에 산책로를 제거 api
export const RemoveToBookmark = async ({
  bookmarkId,
  walkwayId,
}: {
  bookmarkId: number;
  walkwayId: number;
}): Promise<void> => {
  try {
    await instance.delete(`/bookmarks/${bookmarkId}/walkways/${walkwayId}`);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "북마크에서 산책로 제거에 실패했습니다."
    );
  }
};

// 북마크 수정 api
export const putBookmarkName = async ({
  bookmarkId,
  name,
}: {
  bookmarkId: number;
  name: string;
}): Promise<void> => {
  try {
    await instance.put<putBookmarkRequest>(`/bookmarks/${bookmarkId}`, {
      name,
    });
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // 중복된 북마크 이름인 경우 에러 메시지 반환
    if (axiosError.response?.data?.code === "BOOKMARK-02") {
      throw new Error(
        "이름이 같은 북마크가 이미 존재합니다."
      );
    }
    
    throw new Error(
      axiosError.response?.data?.message || "북마크 이름 수정에 실패했습니다."
    );
  }
};

// 북마크 삭제 api
export const deleteBookmarkName = async ({
  bookmarkId,
}: {
  bookmarkId: number;
}): Promise<void> => {
  try {
    await instance.delete(`/bookmarks/${bookmarkId}`);
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "북마크 삭제에 실패했습니다."
    );
  }
};

// 북마크에 저장된 산책로 조회 api
export const getBookmarkedWalkways = async ({
  bookmarkId,
  size = 10,
  lastId,
}: {
  bookmarkId: number;
  size?: number;
  lastId?: number;
}): Promise<WalkwayListResponse> => {
  try {
    const { data: response } = await instance.get<BookmarkWalkwaysResponse>(
      `/bookmarks/${bookmarkId}/walkways`,
      {
        params: {
          lastId,
          size,
        },
      }
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message ||
        "북마크된 산책로 조회에 실패했습니다."
    );
  }
};