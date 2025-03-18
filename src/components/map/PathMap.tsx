import { theme } from "src/styles/colors/theme";
import { Map, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface Location {
  lat: number;
  lng: number;
}

interface PathMapProps {
  pathCoords: Location[];
}

const PathMap = ({ pathCoords }: PathMapProps) => {
  if (!pathCoords || pathCoords.length === 0) {
    return <div>표시할 경로 데이터가 없습니다</div>;
  }

  const center = {
    lat: pathCoords[0].lat,
    lng: pathCoords[0].lng,
  };

  return (
    <MapContainer>
      <Map
        center={center}
        style={{ width: "100%", height: "100%" }}
        level={3}
        draggable={true}
      >
        <Polyline
          path={pathCoords}
          strokeWeight={5}
          strokeColor={theme.Green500}
          strokeOpacity={0.7}
          strokeStyle="solid"
        />
      </Map>
    </MapContainer>
  );
};

export default PathMap;
