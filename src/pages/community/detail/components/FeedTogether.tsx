import { feedList } from "src/apis/crew/crew.type";
import { BiMapPin, BiRun } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";
import { truncateText } from "src/utils/truncateText";

export type FeedTogetherMode = "feed" | "crewCount";

export interface FeedTogetherProps extends Partial<feedList> {
  mode: FeedTogetherMode;
  count?: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5.5rem;
  height: 5rem;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.19);
  border-radius: 20px;
  box-shadow: 0px 2px rgba(0, 0, 0, 0.25);
  background-color: white;
  flex-shrink: 0;
`;

const Contains = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-weight: 600;
  font-size: 14px;
`;

export default function FeedTogether({
  nickname,
  distanceKm,
  durationSec,
  count,
  mode,
}: FeedTogetherProps) {
  const formatDurationToMinutes = (durationSec?: number): string => {
    if (typeof durationSec !== "number") return "-";
    const minutes = Math.floor(durationSec / 60);
    return `${minutes}분`;
  };

  return (
    <Container>
      <div style={{ marginBottom: "8px" }}>
        <Contains>{truncateText(nickname, 4)}</Contains>
        
      </div>
      {mode === "feed" && (
        <>
          <Contains>
            <BsClock />
            {formatDurationToMinutes(durationSec)}
          </Contains>
          <Contains>
            <BiMapPin />
            {distanceKm}Km
          </Contains>
        </>
      )}
      {mode === "crewCount" && (
        <>
          <Contains>
            <BiRun />
            {count ?? "-"}명
          </Contains>
        </>
      )}
    </Container>
  );
}
