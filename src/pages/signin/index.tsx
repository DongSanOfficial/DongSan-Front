import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as MainLogo } from "../../assets/svg/MainLogo.svg";
import { ReactComponent as KakaoLogo } from "../../assets/svg/loginKakao.svg";
import { ReactComponent as GoogleLogo } from "../../assets/svg/loginGoogle.svg";

const Container = styled.div`
  display: flex;
  height: 80vh;
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
  gap: 10px;
  padding: 20px;
`;

interface LoginButtonProps {
  isKakao?: boolean;
}

const LoginButton = styled(Link)<LoginButtonProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 340px;
  height: 60px;
  background-color: ${(props) => (props.isKakao ? "#FCE51E" : "#FFFFFF")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 20px;
  text-decoration: none;
  color: ${(props) => (props.isKakao ? "#000000" : "#4285F4")};
`;

const StyledKakaoIcon = styled(KakaoLogo)`
  width: 24px;
  height: 24px;
`;

const StyledGoogleIcon = styled(GoogleLogo)`
  width: 24px;
  height: 24px;
`;

export default function SignIn() {
  return (
    <Container>
      <Content>
        <MainLogo />
        <ButtonContainer>
          <LoginButton isKakao={true} to="/mypage">
            <StyledKakaoIcon />
            카카오 로그인
          </LoginButton>
          <LoginButton isKakao={false} to="/mypage">
            <StyledGoogleIcon />
            구글 로그인
          </LoginButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
