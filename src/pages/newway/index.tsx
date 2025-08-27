import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { calculateDistance } from "src/utils/calculateDistance";
import TrackingMap from "../../components/map/TrackingMap";
import SmallButton from "src/components/button/SmallButton";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import useWatchLocation from "src/hooks/useWatchLocation";
import TrailInfo from "src/pages/newway/components/TrailInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import AppBar from "src/components/appBar";
import { drawPath } from "src/utils/drawPathUtils";
import {
  uploadCourseImage,
  getWalkwayDetail,
  createWalkwayHistory,
} from "src/apis/walkway/walkway";
import { useToast } from "src/context/toast/useToast";
import WaveTextLoader from "src/components/loading/WaveTextLoader";
import { getMyCrewIds } from "src/apis/auth/auth";
import { getMyCrews } from "src/apis/crew/crew";
import FeedTogether from "../community/detail/components/FeedTogether";
import { newwayStompService } from "src/stomp/newway/newway";
import { cowalkStompService } from "src/stomp/cowalk/cowalk";

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

// 산책완료 버튼 클릭시 팜업 모달 | 백버튼 클릭시 팝업하는 모달 | 조건 미충족 시 표시되는 모달
type ModalType = "done" | "back" | "stop" | null;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FeedTogetherContainer = styled.div<{ isVisible: boolean }>`
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  max-height: ${(props) => (props.isVisible ? "100px" : "0")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
`;

const FeedTogetherRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  position: relative;
  z-index: 20;
  padding: 5px 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: ${theme.Green500};
  cursor: pointer;
  padding: 4px 0;
  text-decoration: underline;
  font-weight: 500;
  align-self: flex-end;

  &:hover {
    color: ${theme.Green300};
  }

  &:active {
    color: ${theme.Green300};
  }
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
  const [isFeedTogetherVisible, setIsFeedTogetherVisible] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastLocationRef = useRef<Location | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const toastShownRef = useRef(false);
  const screenKeepAwakeToastShown = useRef(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const [cowalkModeCount, setCowalkModeCount] = useState<number | null>(null);
  const [isCowalkSocketConnected, setIsCowalkSocketConnected] = useState(false);

  const distancesRef = useRef(0);
  const elapsedTimeRef = useRef(0);
  const [crewCounts, setCrewCounts] = useState<Record<number, number>>({});
  const [crewMap, setCrewMap] = useState<Map<number, string>>(new Map());

  const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 3000,
    timeout: 3000,
  };

  const [crewIds, setCrewIds] = useState<number[]>([]);
  const websocketIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cowalkId = location.state?.cowalkId;

  const { location: geoLocation, getLocation } =
    useWatchLocation(geolocationOptions);

  //같이 산책중인 경우
  useEffect(() => {
    if (mode === "cowalk" && userLocation && !isWalking) {
      // userLocation이 로드된 후에 산책 시작 로직 실행
      handleStartWalking();
    }
  }, [mode, userLocation, isWalking]);

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

    if (!screenKeepAwakeToastShown.current) {
      screenKeepAwakeToastShown.current = true;
      showToast("정확한 위치 기록을 위해 화면이 계속 켜져있도록 해주세요!", "success");
    }
  }, [geoLocation, showToast]);

  useEffect(() => {
    const fetchCrewIds = async () => {
      try {
        const ids = await getMyCrewIds();
        console.log("내 crewIds:", ids);
        setCrewIds(ids);
      } catch (e) {
        console.error("크루 ID 조회 실패", e);
      }
    };

    fetchCrewIds();
  }, []);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const response = await getMyCrews({});
        const map = new Map<number, string>();
        response.data.forEach((crew) => {
          map.set(crew.crewId, crew.name);
        });
        setCrewMap(map);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCrews();
  }, []);

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
              setDistances((prev) => {
                const updated = prev + newDistance;
                distancesRef.current = updated;
                return updated;
              });
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
    if (mode === "create") {
      if (elapsedTime < 300 || distances <= 200) {
        setModalType("stop");
        return;
      }
    }
    setModalType("done");
  };

  useEffect(() => {
    if (
      mode === "create" &&
      isWalking &&
      elapsedTime >= 300 &&
      distances > 200 &&
      !toastShownRef.current
    ) {
      showToast("이제 산책로를 등록할 수 있어요!", "success");
      toastShownRef.current = true;
    }
  }, [mode, isWalking, elapsedTime, distances, showToast]);

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
      if (websocketIntervalRef.current) {
        clearInterval(websocketIntervalRef.current);
        websocketIntervalRef.current = null;
      }
      newwayStompService.disconnect();
      if (mode === "cowalk") {
        cowalkStompService.disconnect();
        setIsCowalkSocketConnected(false);
      }
      setIsSocketConnected(true);
      setIsCowalkSocketConnected(true);
      navigate("/main");
    } else if (modalType === "done") {
      setIsWalking(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (websocketIntervalRef.current) {
        clearInterval(websocketIntervalRef.current);
        websocketIntervalRef.current = null;
      }
      newwayStompService.disconnect();
      if (mode === "cowalk" && cowalkId) {
        cowalkStompService.sendEnd(cowalkId);
        setIsCowalkSocketConnected(false);
      }
      setIsSocketConnected(true);
      setIsCowalkSocketConnected(true);

      if (mode === "create") {
        try {
          const pathImage = await drawPath(movingPath);
          const blob = await fetch(pathImage).then((res) => res.blob());
          const courseImageFile = new File([blob], "course-image.png", {
            type: "image/png",
          });
          const courseImageId = await uploadCourseImage(courseImageFile);
          const distanceInKm = Number((distances / 1000).toFixed(2));
          const pathData: PathData = {
            coordinates: movingPath,
            totalDistance: distanceInKm,
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
      } else if (mode === "follow") {
        try {
          const distanceInKm = Number((distances / 1000).toFixed(2));
          const historyResponse = await createWalkwayHistory(walkwayId, {
            time: elapsedTime,
            distance: distanceInKm,
          });
          showToast("산책로를 이용해주셔서 감사합니다!", "success");
          navigate(`/main/recommend/detail/${walkwayId}`, {
            state: {
              historyId: historyResponse.walkwayHistoryId,
              canReview: historyResponse.canReview,
            },
          });
        } catch (error) {
          console.error("산책로 이용 기록 저장 실패:", error);
          showToast("산책로 이용 기록 저장에 실패했습니다.", "error");
          navigate(-1);
        }
      } else if (mode === "cowalk") {
        navigate("/main");
      }
    } else if (modalType === "back") {
      if (mode === "create") {
        navigate("/main");
      } else if (mode === "cowalk" && cowalkId) {
        cowalkStompService.sendEnd(cowalkId);
        cowalkStompService.disconnect();
        navigate("/main");
      } else {
        navigate(`/main/recommend/detail/${walkwayId}`);
      }
    }
    setModalType(null);
  };

  const getModalType = (type: ModalType) => {
    switch (type) {
      case "stop":
        return {
          message:
            "5분 이상, 200m 이상 산책하지 않은 경우, 산책 정보가 저장되지 않습니다. \n산책을 중단하시겠습니까?",
          cancelText: "취소",
          confirmText: "홈으로",
        };
      case "done":
        return {
          message:
            mode === "create"
              ? "산책로를 등록하시겠습니까?"
              : mode === "cowalk"
              ? "같이 산책을 종료하시겠습니까?"
              : "이용하기를 중단하시겠습니까?",
          cancelText: "취소",
          confirmText: mode === "create" ? "등록" : "중단",
        };
      case "back":
        return {
          message:
            mode === "create"
              ? `홈으로 돌아가시겠습니까?\n산책정보는 저장되지 않습니다.`
              : mode === "cowalk"
              ? `같이 산책을 중단하고 홈으로 돌아가시겠습니까?\n산책 정보는 저장되지 않습니다.`
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

  const toggleFeedTogether = () => {
    setIsFeedTogetherVisible(!isFeedTogetherVisible);
  };

  const shouldShowFeedTogether = () => {
    const hasCrewData =
      crewIds.length > 0 && isSocketConnected && mode !== "cowalk";
    const hasCowalkData = mode === "cowalk" && isCowalkSocketConnected;
    return hasCrewData || hasCowalkData;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (websocketIntervalRef.current) {
        clearInterval(websocketIntervalRef.current);
      }
      newwayStompService.disconnect();
      setIsSocketConnected(true);
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
      if (distanceToStart > 50) {
        showToast(
          "산책로의 출발지 근처로 이동해주세요. 현재 위치가 출발지의 반경 50m내 있지 않다면 산책로를 이용할 수 없어요!",
          "error"
        );
        return;
      }
    }
    // 가입한 크루가 있는 경우에만 산책하기 소켓 연결
    if (crewIds.length > 0) {
      newwayStompService.connect(() => {
        setIsSocketConnected(true);

        console.log("stomp 연결 완료");

        // 최초 send는 interval 등록 직전에 보내기
        newwayStompService.sendOngoing({
          crewIds: crewIds,
          distanceMeter: distancesRef.current,
          timeMin: elapsedTimeRef.current,
        });

        // subscribe
        crewIds.forEach((id) => {
          newwayStompService.subscribeCrewCount(id, (count) => {
            console.log(`crewId ${id} count → ${count}`);
            setCrewCounts((prev) => ({
              ...prev,
              [id]: count,
            }));
          });
        });

        websocketIntervalRef.current = setInterval(() => {
          console.log(
            "interval fired → send ongoing:",
            distancesRef.current,
            elapsedTimeRef.current
          );

          newwayStompService.sendOngoing({
            crewIds: crewIds,
            distanceMeter: distancesRef.current,
            timeMin: elapsedTimeRef.current,
          });
        }, 30000);
      });
    } else {
      console.log("crewIds가 비어있습니다.");
    }
    if (mode === "cowalk" && cowalkId) {
      cowalkStompService.connect(() => {
        console.log("같이 산책 STOMP 연결 성공!");
        setIsCowalkSocketConnected(true);

        cowalkStompService.subscribeCowalkCount(cowalkId, (payload) => {
          console.log(
            `[Cowalk Stomp] Cowalk ID ${cowalkId} 현재 인원수 페이로드:`,
            payload
          );
          setCowalkModeCount(payload.count);
        });

        cowalkStompService.sendOngoing(cowalkId);
      });
    } else if (mode === "cowalk" && !cowalkId) {
      console.error("[Cowalk Stomp] Cowalk 모드이지만 cowalkId가 없습니다.");
      showToast("같이 산책 ID가 없어 산책을 시작할 수 없습니다.", "error");
      return; // cowalkId 없으면 산책 시작하지 않음
    }
    setIsWalking(true);
    setMovingPath([]);
    setDistances(0);
    setElapsedTime(0);
    startTimeRef.current = new Date();

    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const updated = prev + 1;
        elapsedTimeRef.current = updated;
        return updated;
      });
    }, 1000);
  };

  return (
    <>
      <AppBar
        onBack={handleBackClick}
        title={
          mode === "create"
            ? "산책로 등록"
            : mode === "cowalk"
            ? "같이 산책하기"
            : "산책로 이용하기"
        }
      />
      <Container>
        <InfoContainer>
          <div
            style={{
              marginBottom: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
            }}
          >
            <TrailInfo duration={elapsedTime} distance={distances} />
          </div>

          {shouldShowFeedTogether() && (
            <>
              <ToggleButton onClick={toggleFeedTogether}>
                {isFeedTogetherVisible
                  ? "숨기기"
                  : "🏃 함께 산책하는 크루원 보기"}
              </ToggleButton>

              <FeedTogetherContainer isVisible={isFeedTogetherVisible}>
                <FeedTogetherRow>
                  {crewIds.length > 0 &&
                    isSocketConnected &&
                    mode !== "cowalk" &&
                    crewIds.map((id) => (
                      <FeedTogether
                        key={id}
                        mode="crewCount"
                        nickname={crewMap.get(id) ?? `크루${id}`}
                        count={crewCounts[id]}
                      />
                    ))}
                  {mode === "cowalk" && isCowalkSocketConnected && (
                    <FeedTogether
                      key={cowalkId}
                      mode="cowalk"
                      nickname="같이 산책중"
                      count={Number(cowalkModeCount)}
                    />
                  )}
                </FeedTogetherRow>
              </FeedTogetherContainer>
            </>
          )}
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
            primaryText={mode === "create" ? "산책 시작" : "산책로 이용"}
            secondaryText={
              mode === "create" || mode === "cowalk" ? "산책 완료" : "이용 완료"
            }
            isWalking={isWalking}
            onClick={isWalking ? handleStopRequest : handleStartWalking}
          />
        </ButtonContainer>

        <ConfirmationModal
          isOpen={modalType !== null}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          modalType={modalType || "default"}
          mode={mode}
          {...getModalType(modalType)}
        />
      </Container>
    </>
  );
}