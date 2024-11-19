import { Map, MapMarker } from "react-kakao-maps-sdk";
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
    /* 모바일 사파리에서 스크롤 방지 */
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

export const KakaoMap = () => {
    const [mapCenter, setMapCenter] = useState<Location>({ lat: 37.5665, lng: 126.9780 });
    const [userLocation, setUserLocation] = useState<Location | null>(null);
    const watchIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation: Location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(newLocation);
                    setMapCenter(newLocation);
                },
                (error) => {
                    console.error("Error getting initial user location:", error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            );

            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation: Location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(newLocation);
                },
                (error) => {
                    console.error("Error watching user location:", error);
                },
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
    }, []);

    useEffect(() => {
        // 모바일 브라우저의 100vh 문제 해결
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
                </Map>
            </MapWrapper>
        </MapContainer>
    );
};