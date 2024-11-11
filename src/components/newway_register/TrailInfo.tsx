import { BiMapPin } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

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
  font-size: 60px;
  font-family: "Lalezar";
`;
export default function TrailInfo() {
  return (
    <TrailInfoContainer>
      <ClockItems>
        <BsClock style={{ width: "24px", height: "24px" }} />
        00:20
      </ClockItems>
      <span
        style={{ width: "1px", height: "30px", background: "black" }}
      ></span>
      <DistanceItems>
        <BiMapPin style={{ width: "24px", height: "24px" }} />
        4.8
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
