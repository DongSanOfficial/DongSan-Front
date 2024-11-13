import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import loginGoogle from "../../assets/images/loginGoogle.png";
import loginKakao from "../../assets/images/loginKakao.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 250px;
`;

const LoginButton = styled.img`
  cursor: pointer;
  transition: transform 0.2s;
`;

function SignIn() {
  return (
    <Container>
      <Logo src={logo} alt="로고" />
      <LoginButton src={loginKakao} alt="카카오 로그인" />
      <LoginButton src={loginGoogle} alt="구글 로그인" />
    </Container>
  );
}

export default SignIn;
