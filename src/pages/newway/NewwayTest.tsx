import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateDistance } from "src/utils/calculateDistance";
import TrackingMapTest from "../../components/map/TrackingMapTest";
import SmallButton from "src/components/button/SmallButton";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import useWatchLocation from "src/hooks/useWatchLocation";
import TrailInfo from "src/components/newway_register/TrailInfo";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import AppBar from "src/components/appBar";
import { drawPath } from "src/utils/drawPathUtils";

interface Location {
  lat: number;
  lng: number;
}

interface PathData {
  coordinates: Location[];
  totalDistance: number;
  duration: number;
  startTime: Date;
  endTime: Date;
  pathImage: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  max-width: 430px;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 20;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 100px;
  right: 30px;
  z-index: 1;
`;

const LocationButton = styled.button`
  position: absolute;
  bottom: 180px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:active {
    background-color: #f0f0f0;
  }
`;

const LoadingBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export default function NewwayTest() {
  const navigate = useNavigate();
  const [isWalking, setIsWalking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [movingPath, setMovingPath] = useState<Location[]>([]);
  const [distances, setDistances] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastLocationRef = useRef<Location | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 3000,
    timeout: 3000,
  };

  const { location, getLocation } = useWatchLocation(geolocationOptions);

  useEffect(() => {
    if (!location) return;

    const newLocation = {
      lat: location.latitude,
      lng: location.longitude,
    };

    setUserLocation(newLocation);
    lastLocationRef.current = newLocation;
  }, [location]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isWalking && lastLocationRef.current) {
      interval = setInterval(() => {
        if (lastLocationRef.current) {
          setMovingPath((prev) => {
            const newPath = [...prev, lastLocationRef.current!];
            if (prev.length > 0) {
              const newDistance = calculateDistance(newPath);
              setDistances((prev) => prev + newDistance);
            }
            return newPath;
          });
        }
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isWalking]);

  const handleStartWalking = () => {
    setIsWalking(true);
    setMovingPath([]);
    setDistances(0);
    setElapsedTime(0);
    startTimeRef.current = new Date();

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const handleStopRequest = () => {
    setIsModalOpen(true);
  };

  const handleStopWalking = async () => {
    setIsWalking(false);
    setIsModalOpen(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 경로 이미지 생성
    const pathImage = await drawPath(movingPath);
    console.log("생성된 이미지:", pathImage?.substring(0, 100));

    const pathData: PathData = {
      coordinates: movingPath,
      totalDistance: Number((distances / 1000).toFixed(2)),
      duration: elapsedTime,
      startTime:
        startTimeRef.current || new Date(Date.now() - elapsedTime * 1000),
      endTime: new Date(),
      pathImage: pathImage,
    };

    console.log("산책 중단 시 저장된 정보:", {
      경로좌표: pathData.coordinates,
      총거리: pathData.totalDistance,
      소요시간: pathData.duration,
      시작시간: pathData.startTime,
      종료시간: pathData.endTime,
      경로이미지: pathData.pathImage,
    });

    navigate("/newway/registration", { state: pathData });
  };

  const handleContinueWalking = () => {
    setIsModalOpen(false);
  };

  const handleUpdateLocation = () => {
    getLocation();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!userLocation) {
    return (
      <LoadingBox>
        {/* 로딩 스피너 추가 */}
        <h3>위치 정보를 불러오는 중...</h3>
      </LoadingBox>
    );
  }

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="산책로 등록" />
      <Container>
        <InfoContainer>
          <TrailInfo duration={elapsedTime} distance={distances / 1000} />
        </InfoContainer>

        <TrackingMapTest userLocation={userLocation} movingPath={movingPath} />

        {!isWalking && (
          <LocationButton onClick={handleUpdateLocation}>
            <BiCurrentLocation size={24} />
          </LocationButton>
        )}

        <ButtonContainer>
          <SmallButton
            primaryText="산책 시작"
            secondaryText="산책 중단"
            isWalking={isWalking}
            onClick={isWalking ? handleStopRequest : handleStartWalking}
          />
        </ButtonContainer>

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleContinueWalking}
          onConfirm={handleStopWalking}
          message="산책을 중단하시겠습니까?"
          cancelText="계속하기"
          confirmText="중단하기"
        />
      </Container>
    </>
  );
}