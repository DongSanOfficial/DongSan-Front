import React from "react";
import { Map, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 80vw;
  max-width: 322px;
  height: 30vh;
  max-height: 276px;
  margin-bottom: 20px;
`;

interface PathMapProps {
  pathCoords: [number, number][];
}

const PathMap = ({ pathCoords }: PathMapProps) => {
  const center = {
    lat: pathCoords[0][0],
    lng: pathCoords[0][1],
  };

  const mapCoords = pathCoords.map(([lat, lng]) => ({ lat, lng }));

  return (
    <MapContainer>
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={3}
        draggable={true}
      >
        <Polyline
          path={mapCoords}
          strokeWeight={5}
          strokeColor="#FF7575"
          strokeOpacity={0.7}
          strokeStyle="solid"
        />
      </Map>
    </MapContainer>
  );
};

export default PathMap;
