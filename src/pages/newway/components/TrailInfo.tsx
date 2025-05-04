import { BiMapPin } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

const TrailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 430px;
  gap: 20px;
  margin: 0 auto;

  @media (max-width: 375px) {
    width: 80vw;
    max-width: 360px;
    height: 8vh;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px){
    max-width: 100vw;
    align-items: center;
    justify-content: center;
    gap: 150px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const ClockItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 48px;
  font-family: "Lalezar";

  @media (max-width: 375px) {
    font-size: 40px;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 56px;
    gap: 8px;
  }
`;

const DistanceItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  font-size: 50px;
  font-family: "Lalezar";

  @media (max-width: 375px) {
    font-size: 40px;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 58px;
    gap: 8px;
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 28px;
    height: 28px;
  }
`;

const UnitSpan = styled.span`
  font-size: 18px;
  font-family: "Pretendard";

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 22px;
  }
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
