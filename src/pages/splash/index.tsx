import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function Splash() {
  return (
    <Wrapper>
      <b>스플래시 화면입니다.</b>
    </Wrapper>
  );
}
