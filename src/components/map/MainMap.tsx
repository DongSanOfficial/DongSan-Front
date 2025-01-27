import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styles/colors/theme";
import { ReactComponent as LocationIcon } from "../../assets/svg/LocationIcon.svg";
import CurrentLocationMarker from "../../assets/svg/RegisteredLocation.svg";
import SelectedLocationMarker from "../../assets/svg/UserLocation.svg";
import { SearchResult } from "../../pages/main/components/SearchResult";

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

const LocationButton = styled.button`
  position: absolute;
  bottom: 40vh;
  right: 16px;
  width: 40px;
  height: 40px;
  background-color: ${theme.White};
  border: none;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #f8f8f8;
  }

  &:active {
    background-color: #f0f0f0;
  }
`;

const StyledLocationIcon = styled(LocationIcon)`
  width: 24px;
  height: 24px;
  fill: ${(props) => props.theme.Gray700};
`;

const MarkerTitle = styled.div`
  background: ${(props) => props.theme.White};
  padding: 5px 10px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  font-size: 10px;
  font-weight: 300;
  cursor: pointer;
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/**
 * 위치 정보 인터페이스
 */
interface Location {
  lat: number;
  lng: number;
}

/**
 * MainMap 컴포넌트 props
 */
interface MainMapProps {
  /** 지도 중심 좌표 */
  center?: Location;
  /** 지도 중심 좌표 변경 시 호출되는 함수 */
  onCenterChange?: (location: Location) => void;
  /** 선택된 산책로 이름 */
  pathName?: string;
  /** 검색 키워드 */
  searchKeyword?: string;
  /** 검색 결과 처리 함수 */
  onSearchResults?: (results: SearchResult[]) => void;
}

/**
 * 카카오맵 기반 지도 컴포넌트
 * @param props - MainMapProps
 * @returns 지도 컴포넌트
 */
export const MainMap = ({
  center,
  onCenterChange,
  pathName,
  searchKeyword,
  onSearchResults,
}: MainMapProps) => {
  const navigate = useNavigate();
  /** 지도 중심 좌표 */
  const [mapCenter, setMapCenter] = useState<Location>(
    center || { lat: 37.5665, lng: 126.978 }
  );
  /** 사용자 현재 위치 */
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  /**
   * 사용자의 현재 위치를 가져와 지도에 표시
   */
  const updateUserLocation = () => {
    if (!navigator.geolocation) {
      alert("위치 정보가 지원되지 않는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(newLocation);
        setMapCenter(newLocation);
        onCenterChange?.(newLocation);
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert("위치 정보를 가져올 수 없습니다.");
      }
    );
  };

  /** 컴포넌트 마운트 시 현재 위치 가져오기 */
  useEffect(() => {
    updateUserLocation();
  }, []);

  /** 모바일 뷰포트 높이 설정 */
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);
  }, []);

  /** 중심 좌표 변경 시 지도 업데이트 */
  useEffect(() => {
    if (center) {
      setMapCenter(center);
    }
  }, [center]);

  /** 검색어 변경 시 카카오맵 장소 검색 */
  useEffect(() => {
    if (searchKeyword && window.kakao) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(searchKeyword, (data, status) => {
        if (
          status === window.kakao.maps.services.Status.OK &&
          data.length > 0
        ) {
          const searchResults: SearchResult[] = data.map((place) => ({
            placeName: place.place_name,
            address: place.address_name,
            location: {
              lat: parseFloat(place.y),
              lng: parseFloat(place.x),
            },
          }));
          onSearchResults?.(searchResults);
        } else {
          alert("검색 결과를 찾을 수 없습니다.");
        }
      });
    }
  }, [onSearchResults, searchKeyword]);

  /**
   * 마커 클릭 시 상세 페이지로 이동
   */
  const handleMarkerClick = () => {
    navigate("/recommend/detail/:walkwayId");
  };

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
              lng: latlng.getLng(),
            };
            setMapCenter(newCenter);
            onCenterChange?.(newCenter);
          }}
        >
          {userLocation && (
            <MapMarker
              position={userLocation}
              image={{
                src: CurrentLocationMarker,
                size: {
                  width: 30,
                  height: 30,
                },
                options: {
                  offset: {
                    x: 20,
                    y: 40,
                  },
                },
              }}
            />
          )}

          {center && (
            <>
              <MapMarker
                position={center}
                image={{
                  src: SelectedLocationMarker,
                  size: {
                    width: 30,
                    height: 30,
                  },
                }}
              />
              {pathName && (
                <CustomOverlayMap position={center} yAnchor={2}>
                  <MarkerTitle onClick={handleMarkerClick}>
                    {pathName}
                  </MarkerTitle>
                </CustomOverlayMap>
              )}
            </>
          )}
        </Map>
      </MapWrapper>
      <LocationButton
        onClick={updateUserLocation}
        aria-label="현재 위치로 이동"
      >
        <StyledLocationIcon />
      </LocationButton>
    </MapContainer>
  );
};
