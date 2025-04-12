import { useState, useEffect } from 'react';
import { useLocationStore } from "../store/useLocationStore";
import { LocationState } from "../store/locationStore.type";

export type PermissionStatus = 'checking' | 'granted' | 'denied' | 'prompt';

declare global {
  interface Window {
    nativeLocationPermission?: string;
    requestNativeLocationPermission?: () => void;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('checking');
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const getCurrentLocation = useLocationStore(
    (state: LocationState) => state.getCurrentLocation
  );

  // 네이티브 권한 체크
  const checkPermission = async (): Promise<PermissionStatus> => {
    // 네이티브 권한 상태가 있으면 우선 사용
    if (window.nativeLocationPermission) {
      return window.nativeLocationPermission === 'granted' ? 'granted' : 'denied';
    }

    // 네이티브 권한 요청
    if (window.requestNativeLocationPermission) {
      window.requestNativeLocationPermission();
      // 응답을 기다리기 위한 Promise
      return new Promise((resolve) => {
        const handleNativePermission = (event: CustomEvent) => {
          window.removeEventListener('nativePermissionChange', handleNativePermission as EventListener);
          resolve(event.detail === 'granted' ? 'granted' : 'denied');
        };
        window.addEventListener('nativePermissionChange', handleNativePermission as EventListener);
        
        // 타임아웃 설정 (5초)
        setTimeout(() => {
          window.removeEventListener('nativePermissionChange', handleNativePermission as EventListener);
          // 응답이 없으면 기존 웹 방식으로 확인
          checkWebPermission().then(resolve);
        }, 5000);
      });
    }

    return checkWebPermission();
  };
  
  // 웹 브라우저에서의 권한 체크
  const checkWebPermission = async (): Promise<PermissionStatus> => {
    if (!navigator.geolocation) {
      return 'denied';
    }

    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });
        
        return result.state as PermissionStatus;
      } else {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve('granted'),
            (error) => {
              console.log("Geolocation error:", error.code, error.message);
              resolve('denied');
            },
            { timeout: 8000, enableHighAccuracy: true }
          );
        });
      }
    } catch (error) {
      console.error("Location permission check error:", error);
      return 'denied';
    }
  };

  const requestLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData as any);
      return locationData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get location');
      setError(error);
      console.error("Error getting current location:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const status = await checkPermission();
        console.log("Permission status:", status);
        setPermissionStatus(status);
        
        if (status === 'granted') {
          try {
            await requestLocation();
          } catch (error) {
            console.error("Failed to get location after permission granted:", error);
          }
        }
      } catch (error) {
        console.error("Error during permission initialization:", error);
        setPermissionStatus('denied');
      }
    };

    initialize();
    
    // 네이티브 앱에서 권한 변경 이벤트 리스너
    const handleNativePermissionChange = (event: CustomEvent) => {
      const newStatus = event.detail === 'granted' ? 'granted' : 'denied';
      console.log("Native permission changed:", newStatus);
      setPermissionStatus(newStatus);
      
      if (newStatus === 'granted') {
        requestLocation().catch(error => {
          console.error("Failed to get location after permission change:", error);
        });
      }
    };
    
    window.addEventListener('nativePermissionChange', handleNativePermissionChange as EventListener);
    
    // 웹 브라우저에서 권한 변경 감지
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" as PermissionName })
        .then(result => {
          result.addEventListener('change', () => {
            console.log("Browser permission changed:", result.state);
            setPermissionStatus(result.state as PermissionStatus);
            
            if (result.state === 'granted') {
              requestLocation().catch(error => {
                console.error("Failed to get location after browser permission change:", error);
              });
            }
          });
        })
        .catch(error => {
          console.error("Permission query error:", error);
        });
    }
    
    return () => {
      window.removeEventListener('nativePermissionChange', handleNativePermissionChange as EventListener);
    };
  }, []);

  return {
    permissionStatus,
    location,
    error,
    checkPermission,
    requestLocation
  };
};