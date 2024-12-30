import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TrackingMap } from "../../components/map/TrackingMap";
import TrailInfo from "../../components/newway_register/TrailInfo";
import SmallButton from "../../components/button/SmallButton";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  max-width: 430px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none; // 지도 조작을 방해하지 않도록 설정
`;

const TopOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BottomOverlay = styled.div`
  position: absolute;
  bottom: calc(0% + 80px);
  right: calc(0% + 30px);
  background-color: white;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  border-radius: 10px;
`;

interface Location {
  lat: number;
  lng: number;
}

interface PathData {
  coordinates: Location[];
  totalDistance: number;
  duration: string;
  startTime: Date;
  endTime: Date;
}

function Usingtrail() {
  const navigate = useNavigate();
  const pathCoordsRef = useRef<Location[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [distance, setDistance] = useState(0);

  // 타이머 관련 상태와 ref
  const [duration, setDuration] = useState("00:00");
  const startTimeRef = useRef<number | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  // 시간을 포맷하는 함수
  const formatTime = (ms: number) => {
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // 타이머 업데이트 함수
  const updateTimer = () => {
    if (!startTimeRef.current) return;

    const now = Date.now();
    const diff = now - startTimeRef.current;
    setDuration(formatTime(diff));
  };

  // 산책 시작/중단 핸들러
  const handleButtonClick = () => {
    if (!isWalking) {
      // 산책 시작
      setIsWalking(true);
      startTimeRef.current = Date.now();
      pathCoordsRef.current = [];
      setDistance(0);

      // 타이머 시작
      timerIdRef.current = setInterval(updateTimer, 1000);
    } else {
      // 산책 중단
      setIsModalOpen(true);
    }
  };

  // 위치 업데이트
  const handleLocationUpdate = (newLocation: Location) => {
    pathCoordsRef.current.push(newLocation);
  };

  // 거리 업데이트
  const handleDistanceUpdate = (newDistance: number) => {
    setDistance((prev) => prev + newDistance);
  };

  // 산책 중단 확인
  const handleStopWalk = () => {
    // 타이머 정지
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    const pathData: PathData = {
      coordinates: pathCoordsRef.current,
      totalDistance: distance,
      duration: duration,
      startTime: new Date(startTimeRef.current!),
      endTime: new Date(),
    };

    setIsModalOpen(false);
    setIsWalking(false);

    // 상세페이지로 이동
    navigate("/usingtrail/detail", {
      state: pathData,
    });
  };

  // 산책 계속하기
  const handleContinueWalk = () => {
    setIsModalOpen(false);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, []);

  return (
    <PageContainer>
      <MapContainer>
        <TrackingMap
          isTracking={isWalking}
          onLocationUpdate={handleLocationUpdate}
          onDistanceUpdate={handleDistanceUpdate}
        />
      </MapContainer>

      <OverlayContainer>
        <TopOverlay>
          <TrailInfo
            duration={duration}
            distance={Number(distance.toFixed(2))}
          />
        </TopOverlay>

        <BottomOverlay>
          <SmallButton
            primaryText="산책 시작"
            secondaryText="산책 중단"
            isWalking={isWalking}
            onClick={handleButtonClick}
          />
        </BottomOverlay>
      </OverlayContainer>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleContinueWalk}
        onConfirm={handleStopWalk}
        message="산책을 중단하시겠습니까?"
        cancelText="계속하기"
        confirmText="중단하기"
      />
    </PageContainer>
  );
}

export default Usingtrail;
