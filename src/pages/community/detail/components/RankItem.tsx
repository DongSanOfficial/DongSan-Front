import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const ItemWrapper = styled.div`
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
  font-size: 16px;
  width: 20px;
  text-align: center;
  color: ${theme.Green400};
`;

const Name = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.Gray800};
`;

const Right = styled.div`
  display: flex;
  align-items: baseline;
  gap: 30px;
`;

const ValueBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
  min-width: 48px;
  justify-content: flex-end;
`;

const Value = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.Black};
`;

const Unit = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.Gray600};
`;

interface RankItemProps {
  rank: number;
  name: string;
  distance: number;
  time?: number;
}

export default function RankItem({
  rank,
  name,
  distance,
  time,
}: RankItemProps) {
  return (
    <ItemWrapper>
      <Left>
        <RankNumber>{rank}</RankNumber>
        <Name>{name}</Name>
      </Left>
      <Right>
        <ValueBlock>
          <Value>{distance}</Value>
          <Unit>km</Unit>
        </ValueBlock>
        {time !== undefined && (
          <ValueBlock>
            <Value>{time}</Value>
            <Unit>시간</Unit>
          </ValueBlock>
        )}
      </Right>
    </ItemWrapper>
  );
}
