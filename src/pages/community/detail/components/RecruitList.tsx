import { theme } from "src/styles/colors/theme";
import styled from "styled-components";

const Container = styled.div`
  border: 2px solid ${theme.Black};
  border-radius: 8px;
  width: 100%;
  height: auto;
  padding: 0.7rem;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.3);
`;
const CreationInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`;
const Writer = styled.div`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: start;
`;
const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: end;
`;
const RecruitContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
`;
const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const BoldWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Bold = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${theme.Black};
`;
const Count = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.Green500};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
`;
const Line = styled.div`
  margin: 0.5rem auto;
  width: 95%;
  height: 1px;
  background-color: ${theme.Gray500};
`;
const Comment = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 0.5rem 1.5rem;
`;
export default function RecruitList() {
  return (
    <Container>
      <CreationInfo>
        <Writer>| 노성원</Writer>
        <Date>2025.05.16</Date>
      </CreationInfo>
      <RecruitContent>
        <ItemContainer>
          <BoldWrapper>
            <Bold>일시: </Bold>
          </BoldWrapper>

          <Items>
            <div>2025년 5월 15일 목요일</div>
            <div> 오후 8시 30분</div>
          </Items>
        </ItemContainer>

        <ItemContainer>
          <Bold>모집 인원: </Bold>
          <Count>4/5</Count>
        </ItemContainer>
      </RecruitContent>
      <Line />
      <Comment>날씨도 좋은데 퇴근하고 같이 산책해요~</Comment>
    </Container>
  );
}
