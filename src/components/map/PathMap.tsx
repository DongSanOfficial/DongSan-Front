import { theme } from "src/styles/colors/theme";
import { Map, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

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
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [mapLevel, setMapLevel] = useState(3);
  const fitMapToBounds = () => {
    if (!mapRef.current || !pathCoords || pathCoords.length === 0) return;

    try {
      const bounds = new window.kakao.maps.LatLngBounds();
      pathCoords.forEach((coord) => {
        bounds.extend(new window.kakao.maps.LatLng(coord.lat, coord.lng));
      });
      mapRef.current.setBounds(bounds);
      setMapLevel(mapRef.current.getLevel());
    } catch (error) {
      console.error("지도 경계 설정 오류:", error);
    }
  };

  const handleMapCreated = (map: kakao.maps.Map) => {
    mapRef.current = map;
    setTimeout(() => {
      fitMapToBounds();
    }, 100);
  };

  useEffect(() => {
    if (mapRef.current && pathCoords && pathCoords.length > 0) {
      setTimeout(() => {
        fitMapToBounds();
      }, 100);
    }
  }, [pathCoords]);

  // 화면 크기 변경 시 경계 재설정
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        fitMapToBounds();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathCoords]);

  if (!pathCoords || pathCoords.length === 0) {
    return <div>표시할 경로 데이터가 없습니다</div>;
  }

  return (
    <MapContainer>
      <Map
        center={pathCoords[0] || { lat: 37.5665, lng: 126.978 }}
        style={{ width: "100%", height: "100%" }}
        level={mapLevel}
        draggable={true}
        onCreate={handleMapCreated}
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
