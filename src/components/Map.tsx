import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
`;

interface Location {
    lat: number;
    lng: number;
}

export const KakaoMap = () => {
    const [mapCenter, setMapCenter] = useState<Location>({ lat: 37.5665, lng: 126.9780 }); // 서울 시청 좌표로 초기화
    const [userLocation, setUserLocation] = useState<Location | null>(null);

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
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
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