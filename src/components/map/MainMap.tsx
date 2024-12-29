import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from 'react';
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

interface BasicMapProps {
    center?: Location;
    onCenterChange?: (location: Location) => void;
}

export const MainMap = ({ 
    center,
    onCenterChange 
}: BasicMapProps) => {
    const [mapCenter, setMapCenter] = useState<Location>(
        center || { lat: 37.5665, lng: 126.9780 }
    );
    const [userLocation, setUserLocation] = useState<Location | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newLocation: Location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setUserLocation(newLocation);
                if (!center) {
                    setMapCenter(newLocation);
                    onCenterChange?.(newLocation);
                }
            },
            (error) => {
                console.error("Error getting user location:", error);
            }
        );
    }, [center, onCenterChange]);

    useEffect(() => {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVh();
        window.addEventListener('resize', setVh);

        return () => window.removeEventListener('resize', setVh);
    }, []);

    // center prop이 변경되면 지도 중심 업데이트
    useEffect(() => {
        if (center) {
            setMapCenter(center);
        }
    }, [center]);

    return (
        <MapContainer>
            <MapWrapper>
                <Map
                    center={mapCenter}
                    style={{ width: "100%", height: "100%" }}
                    level={2}
                    onCenterChanged={(map) => {
                        const latlng = map.getCenter();
                        const newCenter = {
                            lat: latlng.getLat(),
                            lng: latlng.getLng()
                        };
                        setMapCenter(newCenter);
                        onCenterChange?.(newCenter);
                    }}
                >
                    {userLocation && <MapMarker position={userLocation} />}
                </Map>
            </MapWrapper>
        </MapContainer>
    );
};