import styled from "styled-components";
import { ReactComponent as MainLogo } from "../../assets/svg/MainLogo.svg";
import { Link } from "react-router-dom";

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
  width: 340px;
  height: 60px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isKakao ? "#FCE51E" : "#FFFFFF")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 20px;
  text-decoration: none; /* 링크 밑줄 제거 */
  color: #000; /* 텍스트 색상 */
`;

export default function SignIn() {
  return (
    <Container>
      <Content>
        <MainLogo />
        <ButtonContainer>
          <LoginButton isKakao={true} to="/mypage">
            카카오 로그인
          </LoginButton>
          <LoginButton isKakao={false} to="/mypage">
            구글 로그인
          </LoginButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
