import { BiMapPin } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

interface TrailInfoProps {
  duration: number; // 초 단위
  distance: number; // km 단위 (소수)
}

const TrailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90vw;
  max-width: 430px;
  gap: 20px;

  @media (max-width: 375px) {
    width: 80vw;
    max-width: 360px;
    height: 8vh;
  }
`;

const ClockItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 48px;
  font-family: "Lalezar";
  @media (max-width: 375px) {
    font-size: 40px;
  }
`;

const DistanceItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 50px;
  font-family: "Lalezar";
  @media (max-width: 375px) {
    font-size: 40px;
  }
`;

export default function TrailInfo({ duration, distance }: TrailInfoProps) {
  // 초를 "MM:SS" 형식으로 변환
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // 거리를 "0.00km" 형식으로 변환
  const formatDistance = (km: number): string => {
    // toFixed(2)로 소수점 둘째자리까지 표시하고, 불필요한 0 제거
    return Number(km.toFixed(2)).toString();
  };

  return (
    <TrailInfoContainer>
      <ClockItems>
        <BsClock style={{ width: "24px", height: "24px" }} />
        {formatDuration(duration)}
      </ClockItems>
      <span
        style={{ width: "1px", height: "30px", background: "black" }}
      ></span>
      <DistanceItems>
        <BiMapPin style={{ width: "24px", height: "24px" }} />
        {formatDistance(distance)}
        <span
          style={{
            fontSize: "18px",
            fontFamily: "Pretendard",
            margin: "4px",
          }}
        >
          km
        </span>
      </DistanceItems>
    </TrailInfoContainer>
  );
}
