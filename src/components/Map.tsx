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

export const KakaoMap = () => {
    const [userLocation, setUserLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 서울 시청 좌표로 초기화
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setIsLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>로딩왤케느려</div>;
    }

    return (
        <MapContainer>
            <Map
                center={userLocation}
                style={{ width: "100%", height: "100%" }}
                level={3}
            >
                <MapMarker position={userLocation} />
            </Map>
        </MapContainer>
    );
};