import { BiCalendarCheck } from "react-icons/bi";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

interface DateDisplayProps {
  date?: string;
}

const DateContainer = styled.div`
  color: ${theme.Green500};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 375px) {
    width: 300px;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 6px;
    font-size: 1.1rem;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 1.15rem;
  }
`;

const IconWrapper = styled.div`
  color: black;
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 30px;
    height: 30px;
  }
`;

export default function DateDisplay({ date }: DateDisplayProps) {
  const now = new Date();

  const formatDate = () => {
    if (date) return date; // 수정 모드일 때는 전달받은 날짜 그대로 사용

    // 신규 등록일 때는 현재 시간으로 포맷팅
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  return (
    <DateContainer>
      <IconWrapper>
        <BiCalendarCheck style={{ width: "100%", height: "100%" }} />
      </IconWrapper>
      {formatDate()}
    </DateContainer>
  );
}
