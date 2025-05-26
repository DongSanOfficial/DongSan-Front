import styled from "styled-components";

const Container = styled.div`
  margin-top: 5px;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RankNumber = styled.div`
  font-weight: 700;
  font-size: 14px;
  width: 16px;
  text-align: center;
`;

const Name = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.Gray800};
`;

const Time = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.Gray600};
  margin-left: 8px;
`;

const DistanceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 4px;
`;

const DistanceNumber = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.Black};
`;

const DistanceUnit = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.Gray600};
`;

interface RankingListProps {
  rankItems: {
    name: string;
    distance: number;
    time?: number;
  }[];
  viewType?: "summary" | "full";
}

export default function RankingList({
  rankItems,
  viewType = "summary",
}: RankingListProps) {
  return (
    <Container>
      {rankItems.map((rank, idx) => (
        <RankItem key={idx}>
          <Left>
            <RankNumber>{idx + 1}</RankNumber>
            <Name>{rank.name}</Name>
          </Left>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DistanceRow>
              <DistanceNumber>{rank.distance}</DistanceNumber>
              <DistanceUnit>km</DistanceUnit>
            </DistanceRow>
            {viewType === "full" && rank.time !== undefined && (
              <Time>{rank.time}시간</Time>
            )}
          </div>
        </RankItem>
      ))}
    </Container>
  );
}
