import styled from "styled-components";
import icon from "src/assets/svg/FootPrint.svg";
import { theme } from "src/styles/colors/theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 2rem 0.5rem 0;
`;

const AlertBtn = styled.button<{ isNow: boolean }>`
  background-color: ${({ isNow }) => (isNow ? `${theme.Green500}` : "#f0f0f0")};
  border: none;
  border-radius: 25px;
  width: 4.5rem;
  height: 2rem;
  font-size: 16px;
  color: ${({ isNow }) => (isNow ? "white" : "#333")};
`;

interface MyCowalkListProps {
  startedAt: string;
  endedAt: string;
}

export default function MyCowalkList({
  startedAt,
  endedAt,
}: MyCowalkListProps) {
  const startedDate = new Date(startedAt);

  // 날짜와 시간을 포맷팅 (예: 2025-07-09 10시 06분)
  const year = startedDate.getFullYear();
  const month = (startedDate.getMonth() + 1).toString().padStart(2, "0");
  const date = startedDate.getDate().toString().padStart(2, "0");
  const hour = startedDate.getHours().toString().padStart(2, "0");
  const minute = startedDate.getMinutes().toString().padStart(2, "0");

  const formatted = `${year}-${month}-${date} ${hour}시 ${minute}분`;

  // 현재 시간과 비교해서 isNow 계산 (분 단위까지 정확히 일치할 때 true)
  const now = new Date();

  const isNow = now >= startedDate && now <= new Date(endedAt);

  return (
    <Wrapper>
      <img src={icon} alt="산책 아이콘" />
      <Content>{formatted}</Content>
      <AlertBtn isNow={isNow}>시작</AlertBtn>
    </Wrapper>
  );
}
