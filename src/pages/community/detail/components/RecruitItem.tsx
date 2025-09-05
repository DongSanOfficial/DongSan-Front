import { Cowalkwithcrew } from "src/apis/crew/crew.type";
import { theme } from "src/styles/colors/theme";
import styled from "styled-components";

const RecruitContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem;
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
  align-items: center;
`;
const Bold = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${theme.Black};
  @media (max-width: 375px) {
    font-size: 16px;
  }
`;
const Count = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.Green500};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  @media (max-width: 375px) {
    font-size: 14px;
  }
`;

interface RecruitListProps {
  item: Cowalkwithcrew;
  onClick?: (id: number) => void;
}
export default function RecruitItem({ item }: RecruitListProps) {
  return (
    <>
      <RecruitContent>
        <ItemContainer>
          <BoldWrapper>
            <Bold>일시: </Bold>
          </BoldWrapper>

          <Items>
            <div>{item.date}</div>
            <div>{item.time}</div>
          </Items>
        </ItemContainer>

        <ItemContainer>
          <Bold>모집 인원: </Bold>
          {item.memberLimit !== null ? (
            <Count>
              {item.memberCount}/{item.memberLimit}
            </Count>
          ) : (
            <Count>제한 없음</Count>
          )}
        </ItemContainer>
      </RecruitContent>
    </>
  );
}
