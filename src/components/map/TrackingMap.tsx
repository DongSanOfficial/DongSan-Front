import React from 'react';
import styled from 'styled-components';
import { theme } from "src/styles/colors/theme";
import { Map, MapMarker, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";

interface Location {
  lat: number;
  lng: number;
}

interface TrackingMapProps {
  userLocation: Location;
  movingPath: Location[];
  pathToFollow?: Location[];
  isFollowing?: boolean;
  initialCenter?: Location;
}

const MarkerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-30px);
`;

const StartFlag = styled.svg<{ isBlinking?: boolean }>`
  width: 40px;
  height: 60px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const FinishFlag = styled(StartFlag)``;

const StartMarker = () => (
  <StartFlag viewBox="0 0 40 50">
    <path d="M0,0 L35,0 Q40,0 40,5 L40,25 Q40,30 35,30 L0,30 L0,0" 
          fill={theme.StartFlag} stroke="white" strokeWidth="2"/>
    <rect x="0" y="0" width="2" height="60" fill="white"/>
    <text x="20" y="20" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle">출발</text> 
  </StartFlag>
);

const FinishMarker = ({ isBlinking }: { isBlinking?: boolean }) => (
  <FinishFlag viewBox="0 0 40 50" isBlinking={isBlinking}>
    <path d="M0,0 L35,0 Q40,0 40,5 L40,25 Q40,30 35,30 L0,30 L0,0"  
          fill={theme.FinishFlag} stroke="white" strokeWidth="2"/>
    <rect x="0" y="0" width="2" height="60" fill="white"/>
    <text x="20" y="20" fontFamily="Arial" fontSize="12" fill="white" textAnchor="middle">종점</text>
  </FinishFlag>
);

export default function TrackingMap({
  userLocation,
  movingPath,
  pathToFollow,
  isFollowing,
  initialCenter,
}: TrackingMapProps) {
  return (
    <Map
      draggable={true}
      center={initialCenter || userLocation}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={1}
    >
      <MapMarker position={userLocation}></MapMarker>

      {isFollowing && pathToFollow && pathToFollow.length > 0 && (
        <>
          <CustomOverlayMap
            position={pathToFollow[0]}
          >
            <MarkerWrapper>
              <StartMarker />
            </MarkerWrapper>
          </CustomOverlayMap>

          <CustomOverlayMap
            position={pathToFollow[pathToFollow.length - 1]}
          >
            <MarkerWrapper>
              <FinishMarker/>
            </MarkerWrapper>
          </CustomOverlayMap>

          <Polyline
            path={pathToFollow}
            strokeWeight={4}
            strokeColor={theme.Following}
            strokeOpacity={0.7}
            strokeStyle={"shortdashdot"}
          />
        </>
      )}

      {movingPath.length > 0 && (
        <Polyline
          path={movingPath}
          strokeWeight={5}
          strokeColor={theme.Green500}
          strokeOpacity={0.7}
          strokeStyle={"solid"}
        />
      )}
    </Map>
  );
}