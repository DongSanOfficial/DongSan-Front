import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as MainLogo } from "../../assets/svg/MainLogo.svg";
import LoginButton from "../../components/button/LoginButton";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 0 30px;
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
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("access_token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
  }, [location]);

  return (
    <Container>
      <Content>
        <MainLogo />
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
