export interface ApiResponseFormat<T> {
  data: T;
  status: number;
  message?: string;
  isSuccess: boolean;
}
