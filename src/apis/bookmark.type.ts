//북마크에 산책로를 추가
export interface addToBookmark {
  walkwayId: number;
}

// 북마크 생성 요청을 위한 인터페이스
export interface AddBookmarkRequest {
  name: string;
}
// 북마크 생성 응답을 위한 인터페이스
export interface AddBookmarkResponse {
  bookmarkId: number;
}
