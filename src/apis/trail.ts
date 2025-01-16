// src/apis/trail.ts
import { ApiResponseFormat } from "./api.type";
import instance from "./instance";

export interface Trail {
  walkwayId: number;
  name: string;
  date: string;
  distance: number;
  courseImageUrl: string;
  time: number;
  memo: string;
  likeCount: number;
  reviewCount: number;
  rating: number;
  hashtags: string[];
}

export const getTrails = async (
  size: number = 5,
  lastWalkwayId?: number
): Promise<Trail[]> => {
  const endpoint =
    `/users/walkways/upload?size=${size}` +
    (lastWalkwayId ? `&walkwayId=${lastWalkwayId}` : "");

  try {
    const response = await instance.get<
      ApiResponseFormat<{ walkways: Trail[] }>
    >(endpoint, {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
      },
    });

    if (response.data.isSuccess) {
      return response.data.data.walkways;
    } else {
      throw new Error(response.data.message || "Failed to fetch trails");
    }
  } catch (error) {
    throw error;
  }
};
