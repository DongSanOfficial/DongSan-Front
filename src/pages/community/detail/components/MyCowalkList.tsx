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
const AlertBtn = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 25px;
  width: 4.5rem;
  height: 2rem;
  font-size: 16px;
  color: #333;
`;
interface Props {
  date: string;
  time: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}
export default function MyCowalkList({ date, time }: Props) {
  const formatted = `${date} ${time.hour}시 ${time.minute}분`;

  return (
    <Wrapper>
      <img src={icon} alt="산책 아이콘" />
      <Content>{formatted}</Content>
      <AlertBtn>시작</AlertBtn>
    </Wrapper>
  );
}
