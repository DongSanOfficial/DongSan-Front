import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

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

interface Location {
    lat: number;
    lng: number;
}

interface TrackingMapProps {
    isTracking: boolean;
    onLocationUpdate?: (location: Location) => void;
    onDistanceUpdate?: (distance: number) => void;
}

export const TrackingMap = ({
    isTracking,
    onLocationUpdate,
    onDistanceUpdate
}: TrackingMapProps) => {
    const [mapCenter, setMapCenter] = useState<Location>({ lat: 37.5665, lng: 126.9780 });
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const [pathCoords, setPathCoords] = useState<Location[]>([]);
    const watchIdRef = useRef<number | null>(null);

    // 거리 계산 (라이브러리 알아보깅ㄴ)
    const calculateDistance = (coord1: Location, coord2: Location): number => {
        const R = 6371; // 지구의 반지름 (km)
        const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
        const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    useEffect(() => {
        if (!navigator.geolocation) return;

        const successCallback = (position: GeolocationPosition) => {
            const newLocation: Location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            setUserLocation(newLocation);
            setMapCenter(newLocation);
            
            if (isTracking) {
                setPathCoords(prev => {
                    const newCoords = [...prev, newLocation];
                    
                    // 새로운 위치가 추가될 때마다 거리 계산
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

        // 초기 위치 가져오기
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });

        // 트래킹 중일 때만 위치 감시 시작
        if (isTracking) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                successCallback,
                errorCallback,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
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
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVh();
        window.addEventListener('resize', setVh);

        return () => window.removeEventListener('resize', setVh);
    }, []);

    return (
        <MapContainer>
            <MapWrapper>
                <Map
                    center={mapCenter}
                    style={{ width: "100%", height: "100%" }}
                    level={2}
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
        </MapContainer>
    );
};