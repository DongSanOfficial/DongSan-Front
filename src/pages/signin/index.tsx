import styled from "styled-components";
import { ReactComponent as MainLogo } from "../../assets/svg/MainLogo.svg";
import loginGoogle from "../../assets/images/loginGoogle.png";
import loginKakao from "../../assets/images/loginKakao.png";

const Container = styled.div`
  display: flex;
  height: 100vh;

`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  gap: 20vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.img`
  cursor: pointer;
`;

export default function SignIn() {
  return (
    <Container>
      <Content>
        <MainLogo/>
        <ButtonContainer>
          <LoginButton src={loginKakao} alt="카카오 로그인" />
          <LoginButton src={loginGoogle} alt="구글 로그인" />
        </ButtonContainer>
      </Content>
    </Container>
  );
}