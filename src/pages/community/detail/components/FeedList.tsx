import { feedList } from "@/apis/crew/crew.type";
import { theme } from "src/styles/colors/theme";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid ${theme.Black};
  border-radius: 8px;
  width: 100%;
  height: 5.5rem;
  padding: 0.5rem;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.3);
`;
const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: end;
`;
const Record = styled.div`
  font-size: 16px;
  height: 3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  // margin: 0 0.5rem;
`;
const Bold = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${theme.Green500};
  margin-left: 0.5rem;
`;
export default function FeedList({ date, nickname, distanceKm }: feedList) {
  return (
    <Container>
      <Date>{date}</Date>
      <Record>
        {nickname}님이
        <Bold>{distanceKm}km</Bold> 를 산책하였습니다.
      </Record>
    </Container>
  );
}
