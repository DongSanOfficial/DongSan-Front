export interface ApiResponseFormat<T> {
  data: T;
  status: number;
  message?: string;
  isSuccess: boolean;
}

export interface ApiErrorResponse {
  isSuccess: false;
  code: string;
  message: string;
}
