import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
    width: 100vw;
    height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    position: fixed;
    top: 0;
`;

interface Location {
    lat: number;
    lng: number;
}

export const KakaoMap = () => {
    const [mapCenter, setMapCenter] = useState<Location>({ lat: 37.5665, lng: 126.9780 }); // 서울 시청 좌표로 초기화
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
                }
            );

            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation: Location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(newLocation);
                    // setMapCenter(newLocation);
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
        } else {
            console.error("Geolocation is not supported by this browser.");
        }

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    return (
        <MapContainer>
            <Map
                center={mapCenter}
                style={{ width: "100%", height: "100%" }}
                level={2}
            >
                {userLocation && <MapMarker position={userLocation} />}
            </Map>
        </MapContainer>
    );
};