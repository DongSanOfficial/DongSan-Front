import { BiMapPin } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

const TrailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  width: 80vw;
  max-width: 360px;
  height: 8vh;
`;

const ClockItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 48px;
  font-family: "Lalezar";
`;

const DistanceItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 50px;
  font-family: "Lalezar";
`;

interface TrailInfoProps {
  duration: number;
  distance: number; // NewWay에서는 미터 단위, Registration에서는 km 단위로 받음
  isRegistration?: boolean; // Registration 페이지인지 여부
}

export default function TrailInfo({
  duration,
  distance,
  isRegistration = false,
}: TrailInfoProps) {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const formatDistance = (
    value: number,
    isRegistration: boolean
  ): { value: string; unit: string } => {
    if (isRegistration) {
      // Registration 페이지에서는 항상 km로 표시 (소수점 2자리)
      return {
        value: value.toFixed(2),
        unit: "km",
      };
    } else {
      // NewWay 페이지에서는 동적으로 단위 변환 (미터 단위로 받음)
      if (value >= 1000) {
        // 1km 이상일 때도 소수점 2자리까지만 표시
        return {
          value: (value / 1000).toFixed(2),
          unit: "km",
        };
      }
      return {
        value: Math.round(value).toString(),
        unit: "m",
      };
    }
  };

  const formattedDistance = formatDistance(distance, isRegistration);

  return (
    <TrailInfoContainer>
      <ClockItems>
        <BsClock style={{ width: "24px", height: "24px" }} />
        {formatDuration(duration)}
      </ClockItems>

      <DistanceItems>
        <BiMapPin style={{ width: "24px", height: "24px" }} />
        {formattedDistance.value}
        <span style={{ fontSize: "18px", fontFamily: "Pretendard" }}>
          {formattedDistance.unit}
        </span>
      </DistanceItems>
    </TrailInfoContainer>
  );
}
