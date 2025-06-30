import styled from "styled-components";
import icon from "src/assets/svg/FootPrint.svg";

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
  background-color: ${({ isNow }) => (isNow ? "green" : "#f0f0f0")};
  border: none;
  border-radius: 25px;
  width: 4.5rem;
  height: 2rem;
  font-size: 16px;
  color: ${({ isNow }) => (isNow ? "white" : "#333")};
`;

interface Props {
  date: string;
  time: string;
}

export default function MyCowalkList({ date, time }: Props) {
  const [hour, minute] = time.split(":"); // "10:06:20" → ["10", "06", "20"]
  const formatted = `${date} ${hour}시 ${minute}분`;

  const now = new Date();
  const targetTime = new Date(`${date}T${time}`);

  const isNow =
    now.getFullYear() === targetTime.getFullYear() &&
    now.getMonth() === targetTime.getMonth() &&
    now.getDate() === targetTime.getDate() &&
    now.getHours() === targetTime.getHours() &&
    now.getMinutes() === targetTime.getMinutes();

  return (
    <Wrapper>
      <img src={icon} alt="산책 아이콘" />
      <Content>{formatted}</Content>
      <AlertBtn isNow={isNow}>시작</AlertBtn>
    </Wrapper>
  );
}
