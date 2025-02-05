import { create } from "zustand";
import { Location, LocationState } from "./locationStore.type";

export const useLocationStore = create<LocationState>()((set) => ({
  currentLocation: null,
  loading: false,
  error: null,

  setCurrentLocation: (location: Location) =>
    set({ currentLocation: location, error: null }),

  setLoading: (loading: boolean) => set({ loading }),

  setError: (error: string) => set({ error, loading: false }),

  getCurrentLocation: async () => {
    set({ loading: true });

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("위치 정보가 지원되지 않는 브라우저입니다."));
            return;
          }

          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      set({ currentLocation: location, loading: false, error: null });
      return location;
    } catch (error) {
      const errorMessage =
        "위치 정보를 가져올 수 없습니다. 디바이스 설정에서 위치 권한을 확인해주세요.";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
