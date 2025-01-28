import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as LocationIcon } from "../../assets/svg/LocationIcon.svg";
import { theme } from "../../styles/colors/theme";

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const LocationButton = styled.button`
  position: absolute;
  bottom: 200px;
  right: 30px;
  width: 40px;
  height: 40px;
  background-color: ${theme.White};
  border: none;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #f8f8f8;
  }

  &:active {
    background-color: #f0f0f0;
  }
`;

const StyledLocationIcon = styled(LocationIcon)`
  width: 24px;
  height: 24px;
  fill: ${theme.White};
`;

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  isTracking: boolean;
  onLocationUpdate?: (location: Location) => void;
  onDistanceUpdate?: (distance: number) => void;
  onCenterChange?: (location: Location) => void;
}

export const TrackingMap = ({
  isTracking,
  onLocationUpdate,
  onDistanceUpdate,
  onCenterChange,
}: TrackingMapProps) => {
  const [mapCenter, setMapCenter] = useState<Location>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [pathCoords, setPathCoords] = useState<Location[]>([]);
  const watchIdRef = useRef<number | null>(null);

  const calculateDistance = (coord1: Location, coord2: Location): number => {
    const R = 6371;
    const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const dLon = ((coord2.lng - coord1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coord1.lat * Math.PI) / 180) *
        Math.cos((coord2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    const successCallback = (position: GeolocationPosition) => {
      const newLocation: Location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setUserLocation(newLocation);
      setMapCenter(newLocation);

      if (isTracking) {
        setPathCoords((prev) => {
          const newCoords = [...prev, newLocation];
          if (prev.length > 0) {
            const lastCoord = prev[prev.length - 1];
            const newDistance = calculateDistance(lastCoord, newLocation);
            onDistanceUpdate?.(newDistance);
          }

          return newCoords;
        });
        onLocationUpdate?.(newLocation);
      }
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("사용자 위치 가져오기 에러:", error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    });

    if (isTracking) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        successCallback,
        errorCallback,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isTracking, onLocationUpdate, onDistanceUpdate]);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);
  }, []);

  const updateUserLocation = () => {
    if (!navigator.geolocation) {
      alert("위치 정보가 지원되지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        setMapCenter(newLocation);
        onCenterChange?.(newLocation);
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert(
          "위치 정보를 가져올 수 없습니다. 디바이스 설정에서 위치 권한을 확인해주세요."
        );
      }
    );
  };

  return (
    <MapContainer>
      <MapWrapper>
        <Map
          center={mapCenter}
          onCenterChanged={(map) => {
            const latlng = map.getCenter();
            const newCenter = {
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            };
            setMapCenter(newCenter);
            onCenterChange?.(newCenter);
          }}
          style={{ width: "100%", height: "100%" }}
          level={1}
        >
          {userLocation && <MapMarker position={userLocation} />}
          {pathCoords.length > 1 && (
            <Polyline
              path={pathCoords}
              strokeWeight={5}
              strokeColor="#FF7575"
              strokeOpacity={0.7}
              strokeStyle="solid"
            />
          )}
        </Map>
      </MapWrapper>
      {!isTracking && (
        <LocationButton
          onClick={updateUserLocation}
          aria-label="현재 위치로 이동"
        >
          <StyledLocationIcon />
        </LocationButton>
      )}
    </MapContainer>
  );
};
