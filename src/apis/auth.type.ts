export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

// 마이페이지 유저 프로필 타입
export interface UserProfileType {
  profileImageUrl: string;
  email: string;
  nickname: string;
}
