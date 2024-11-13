import { BiMapPin } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

interface TrailInfoProps {
  duration: string;
  distance: number; 

}
const TrailInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ClockItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 48px;
  font-family: "Lalezar";
`;
const DistanceItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 50px;
  font-family: "Lalezar";
`;
export default function TrailInfo({duration, distance}: TrailInfoProps) {
  return (
    <TrailInfoContainer>
      <ClockItems>
        <BsClock style={{ width: "24px", height: "24px" }} />
        {duration}
      </ClockItems>
      <span
        style={{ width: "1px", height: "30px", background: "black" }}
      ></span>
      <DistanceItems>
      <BiMapPin style={{ width: "24px", height: "24px" }} />
        {distance}
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
