import styled from "styled-components";
import { ReactComponent as SplashLogo } from "../../assets/svg/SplashLogo.svg";
import LoginButton from "../../components/button/LoginButton";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 0 30px;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
`;

const LogoText = styled.h3`
  font-size: 18px;
  margin-top: -80px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60vh;
  margin: auto;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export default function SignIn() {
  return (
    <Container>
      <Content>
        <LogoContainer>
          <SplashLogo />
          <LogoText>동산과 함께 산책해요</LogoText>
        </LogoContainer>
        <ButtonContainer>
          <LoginButton
            variant="kakaoLogin"
            to={`${API_BASE_URL}/oauth2/authorization/kakao`}
          />
          <LoginButton
            variant="naverLogin"
            to={`${API_BASE_URL}/oauth2/authorization/naver`}
          />
        </ButtonContainer>
      </Content>
    </Container>
  );
}
