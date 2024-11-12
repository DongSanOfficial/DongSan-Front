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
      <b>동산과 동네산책해요.</b>
    </Wrapper>
  );
}
