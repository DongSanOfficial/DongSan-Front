import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateDistance } from "src/utils/calculateDistance";
import TrackingMapTest from "../../components/map/TrackingMap";
import SmallButton from "src/components/button/SmallButton";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import useWatchLocation from "src/hooks/useWatchLocation";
import TrailInfo from "src/components/newway_register/TrailInfo";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import AppBar from "src/components/appBar";
import { drawPath } from "src/utils/drawPathUtils";
import { uploadCourseImage } from "src/apis/walkway";
import { useToast } from "src/hooks/useToast";
import WaveTextLoader from "src/components/loading/WaveTextLoader";

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
  courseImageId: number;
}

// 산책중단 버튼 클릭시 팜업 모달 | 백버튼 클릭시 팝업하는 모달
type ModalType = "stop" | "back" | null;

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

export default function NewWay() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isWalking, setIsWalking] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
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
    if (elapsedTime < 60) {
      // 산책 경과 시간이 1분 미만인 경우
      showToast("1분 이상 산책해주세요.", "error");
      return;
    }
    setModalType("stop");
  };
  const handleBackClick = () => {
    setModalType("back");
  };

  const handleModalClose = () => {
    setModalType(null);
  };

  const handleModalConfirm = async () => {
    if (modalType === "stop") {
      setIsWalking(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      try {
        const pathImage = await drawPath(movingPath);

        const blob = await fetch(pathImage).then((res) => res.blob());
        const courseImageFile = new File([blob], "course-image.png", {
          type: "image/png",
        });

        const courseImageId = await uploadCourseImage(courseImageFile);

        const pathData: PathData = {
          coordinates: movingPath,
          totalDistance: distances,
          duration: elapsedTime,
          startTime:
            startTimeRef.current || new Date(Date.now() - elapsedTime * 1000),
          endTime: new Date(),
          pathImage: pathImage,
          courseImageId: courseImageId,
        };

        navigate("/newway/registration", {
          state: { ...pathData, isEditMode: false },
        });
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    } else if (modalType === "back") {
      navigate("/main");
    }
    setModalType(null);
  };

  const getModalType = (type: ModalType) => {
    switch (type) {
      case "stop":
        return {
          message: "산책을 중단하시겠습니까?",
          cancelText: "계속하기",
          confirmText: "중단하기",
        };
      case "back":
        return {
          message: `홈으로 돌아가시겠습니까?
                    산책정보는 저장되지 않습니다.`,
          cancelText: "취소",
          confirmText: "확인",
        };
      default:
        return {
          message: "",
          cancelText: "취소",
          confirmText: "확인",
        };
    }
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
    return <WaveTextLoader>위치 정보를 불러오는 중...</WaveTextLoader>;
  }
  return (
    <>
      <AppBar onBack={handleBackClick} title="산책로 등록" />
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
          isOpen={modalType !== null}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          {...getModalType(modalType)}
        />
      </Container>
    </>
  );
}
