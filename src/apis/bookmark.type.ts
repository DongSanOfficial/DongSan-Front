// 북마크 생성 요청
export interface AddBookmarkRequest {
  name: string;
}

// 북마크 생성 응답
export interface AddBookmarkResponse {
  bookmarkId: number;
  name: string;
}

// 북마크 제목 리스트 조회 응답(마이페이지)
export interface getBookmarkTitleResponse {
  data: Array<{
    bookmarkId: number;
    title: string;
  }>;
  hasNext: boolean;
}

// 북마크 리스트 조회 응답 (marked여부 포함)
export interface getIsBookmarkedResponse {
  data: Array<{
    bookmarkId: number;
    name: string;
    marked: boolean;
  }>;
  hasNext: boolean;
}

// 북마크에 산책로 추가 응답
export interface addToBookmark {
  success: boolean;
  message?: string;
}

// 북마크 수정 요청
export interface putBookmarkRequest {
  name: string;
}

// 북마크 삭제 요청
export interface deleteBookmarkRequest {
  bookmarkId: number;
}
