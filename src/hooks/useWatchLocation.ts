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

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // 위치 업데이트 옵션
    const watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 3000,        // 3초 이내의 캐시된 위치만 사용
      timeout: 3000           // 27초 타임아웃
    };

    locationWatchId.current = geolocation.watchPosition(
      handleSuccess, 
      handleError,
      watchOptions
    );

    return cancelLocationWatch;
  }, []);  // options 의존성 제거

  return { location, cancelLocationWatch, error };
};

export default useWatchLocation;