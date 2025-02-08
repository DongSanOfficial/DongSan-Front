import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { calculateDistance } from "src/utils/calculateDistance";
import TrackingMap from "../../components/map/TrackingMap";
import SmallButton from "src/components/button/SmallButton";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import useWatchLocation from "src/hooks/useWatchLocation";
import TrailInfo from "src/components/newway_register/TrailInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import AppBar from "src/components/appBar";
import { drawPath } from "src/utils/drawPathUtils";
import { uploadCourseImage, getWalkwayDetail } from "src/apis/walkway";
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
  const location = useLocation();
  const { showToast } = useToast();

  // 이용하기 기능을 위한 분기처리
  const mode = location.state?.mode || "create";
  const walkwayId = location.state?.walkwayId;

  const [isWalking, setIsWalking] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [movingPath, setMovingPath] = useState<Location[]>([]);
  const [pathToFollow, setPathToFollow] = useState<Location[]>([]);
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

  const { location: geoLocation, getLocation } =
    useWatchLocation(geolocationOptions);

  // 기존 경로 데이터 가져오기 (따라가기 모드)
  useEffect(() => {
    const fetchWalkwayDetail = async () => {
      if (mode !== "follow" || !walkwayId) return;

      try {
        const data = await getWalkwayDetail(walkwayId);
        const coords = data.course.map((loc: any) => ({
          lat: loc.latitude,
          lng: loc.longitude,
        }));
        setPathToFollow(coords);
      } catch (error) {
        console.error("Failed to fetch walkway details:", error);
        showToast("경로 정보를 불러오는데 실패했습니다.", "error");
      }
    };

    fetchWalkwayDetail();
  }, [mode, walkwayId, showToast]);

  // 위치 업데이트 처리
  useEffect(() => {
    if (!geoLocation) return;

    const newLocation = {
      lat: geoLocation.latitude,
      lng: geoLocation.longitude,
    };

    setUserLocation(newLocation);
    lastLocationRef.current = newLocation;
  }, [geoLocation]);

  // 경로 추적 및 거리 계산
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

  const handleStopRequest = () => {
    if (mode === "create" && elapsedTime < 60) {
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

      if (mode === "create") {
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
          showToast("이미지 업로드에 실패했습니다.", "error");
        }
      } else {
        navigate(-1);
      }
    } else if (modalType === "back") {
      if (mode === "create") {
        navigate("/main");
      } else {
        navigate(-1); // follow 모드일 때는 이전 페이지로
      }
    }
    setModalType(null);
  };

  const getModalType = (type: ModalType) => {
    switch (type) {
      case "stop":
        return {
          message:
            mode === "create"
              ? "산책을 중단하시겠습니까?"
              : "따라가기를 중단하시겠습니까?",
          cancelText: mode === "create" ? "계속하기" : "계속 따라가기",
          confirmText: "중단하기",
        };
      case "back":
        return {
          message:
            mode === "create"
              ? `홈으로 돌아가시겠습니까?\n산책정보는 저장되지 않습니다.`
              : "이용을 중단하시겠습니까?\n산책로 이용내역은 저장되지 않습니다.",
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

  const checkDistanceToStart = (
    userLocation: Location,
    startPoint: Location
  ): number => {
    // calculateDistance 함수는 배열을 받으므로, 두 점으로 구성된 배열 생성
    const points = [userLocation, startPoint];
    return calculateDistance(points);
  };

  const handleStartWalking = () => {
    if (mode === "follow" && pathToFollow.length > 0 && userLocation) {
      const startPoint = pathToFollow[0];
      const distanceToStart = checkDistanceToStart(userLocation, startPoint);
      console.log("distanceToStart: ", distanceToStart);
      if (distanceToStart > 50) {
        // 50미터 이상 떨어져 있으면
        showToast(
          "산책로의 출발지 근처로 이동해주세요. 현재 위치가 출발지의 반경 50m내 있지 않다면 산책로를 이용할 수 없어요!",
          "error"
        );
        return;
      }
    }

    setIsWalking(true);
    setMovingPath([]);
    setDistances(0);
    setElapsedTime(0);
    startTimeRef.current = new Date();

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  return (
    <>
      <AppBar
        onBack={handleBackClick}
        title={mode === "create" ? "산책로 등록" : "산책로 따라걷기"}
      />
      <Container>
        <InfoContainer>
          <TrailInfo duration={elapsedTime} distance={distances / 1000} />
        </InfoContainer>

        <TrackingMap
          userLocation={userLocation}
          movingPath={movingPath}
          pathToFollow={mode === "follow" ? pathToFollow : undefined}
          isFollowing={mode === "follow"}
          initialCenter={
            mode === "follow" && pathToFollow.length > 0
              ? pathToFollow[0]
              : userLocation
          }
        />

        {!isWalking && (
          <LocationButton onClick={handleUpdateLocation}>
            <BiCurrentLocation size={24} />
          </LocationButton>
        )}

        <ButtonContainer>
          <SmallButton
            primaryText={mode === "create" ? "산책 시작" : "따라걷기"}
            secondaryText={mode === "create" ? "산책 중단" : "그만하기"}
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
