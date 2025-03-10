import { useState, useEffect } from 'react';
import { useLocationStore } from "../store/useLocationStore";
import { LocationState } from "../store/locationStore.type";

export type PermissionStatus = 'checking' | 'granted' | 'denied' | 'prompt';

export const useLocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('checking');
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const getCurrentLocation = useLocationStore(
    (state: LocationState) => state.getCurrentLocation
  );

  const checkPermission = async (): Promise<PermissionStatus> => {
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
            () => resolve('denied'),
            { timeout: 8000 }
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
      const status = await checkPermission();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        try {
          await requestLocation();
        } catch (error) {
        }
      }
    };

    initialize();
    
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" as PermissionName })
        .then(result => {
          result.addEventListener('change', () => {
            setPermissionStatus(result.state as PermissionStatus);
            
            if (result.state === 'granted') {
              requestLocation().catch(() => {
              });
            }
          });
        })
        .catch(error => {
          console.error("Permission query error:", error);
        });
    }
  }, []);

  return {
    permissionStatus,
    location,
    error,
    checkPermission,
    requestLocation
  };
};