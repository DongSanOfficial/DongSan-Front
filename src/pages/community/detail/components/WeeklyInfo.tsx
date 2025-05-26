import styled from "styled-components";

const Wrapper = styled.div``;

const InfoRow = styled.div`
  display: flex;
  gap: 12px;
`;

const InfoCard = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08); // 아래쪽 그림자 강조
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.Gray600};
  text-align: left;
`;

const ValueRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  margin-top: 6px;
`;

const Value = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.Black};
`;

const Unit = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.Gray600};
  margin-left: 4px;
`;

interface Props {
  crewSize: number;
  distance: number;
  time: number;
}

export default function WeeklyInfo({ crewSize, distance, time }: Props) {
  return (
    <Wrapper>
      <InfoRow>
        <InfoCard>
          <Label>크루원</Label>
          <ValueRow>
            <Value>{crewSize}</Value>
            <Unit>명</Unit>
          </ValueRow>
        </InfoCard>
        <InfoCard>
          <Label>거리</Label>
          <ValueRow>
            <Value>{distance}</Value>
            <Unit>km</Unit>
          </ValueRow>
        </InfoCard>
        <InfoCard>
          <Label>시간</Label>
          <ValueRow>
            <Value>{time}</Value>
            <Unit>시간</Unit>
          </ValueRow>
        </InfoCard>
      </InfoRow>
    </Wrapper>
  );
}
