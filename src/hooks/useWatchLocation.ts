import { useState, useEffect, useRef } from "react";

interface LocationState {
  latitude: number;
  longitude: number;
}

const useWatchLocation = (options = {}) => {
  const [location, setLocation] = useState<LocationState>();
  const [error, setError] = useState<string>();
  const locationWatchId = useRef<number | null>(null);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  const cancelLocationWatch = () => {
    const { geolocation } = navigator;
    if (locationWatchId.current && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
      locationWatchId.current = null;
    }
  };

  // 현재 위치를 즉시 가져오는 함수
  const getLocation = () => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      maximumAge: 0, // 캐시된 위치를 사용하지 않음
      timeout: 3000,
    });
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // 위치 업데이트 옵션
    const watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 3000, // 3초 이내의 캐시된 위치만 사용
      timeout: 3000, // 3초 타임아웃
    };

    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      watchOptions
    );

    return cancelLocationWatch;
  }, []);

  return { location, cancelLocationWatch, error, getLocation };
};

export default useWatchLocation;
