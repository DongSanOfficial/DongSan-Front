import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as KakaoLogo } from "../../assets/svg/loginKakao.svg";
import { ReactComponent as NaverLogo } from "../../assets/svg/loginNaver.svg";
import { ReactComponent as AppleLogo } from "../../assets/svg/loginApple.svg";
import { theme } from "../../styles/colors/theme";

interface LoginButtonProps {
  variant: "kakaoLogin" | "naverLogin" | "appleLogin";
  to: string;
}

const StyledButton = styled(Link)<Pick<LoginButtonProps, "variant">>`
  width: 100%;
  height: 56px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;

  ${(props) => {
    switch (props.variant) {
      case "kakaoLogin":
        return `
          background-color: ${theme.Kakao};
          color: ${theme.KakaoBtnText};
        `;
      case "naverLogin":
        return `
          background-color: ${theme.Naver};
          color: ${theme.White};
        `;
      case "appleLogin":
        return `
          background-color: ${theme.Black};
          color: ${theme.White};
        `;
    }
  }}
`;

const ButtonText = styled.span`
  letter-spacing: 0;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
`;

const StyledKakaoIcon = styled(KakaoLogo)`
  position: absolute;
  left: 20px;
  width: 18px;
  height: 18px;
`;

const StyledNaverIcon = styled(NaverLogo)`
  position: absolute;
  left: 20px;
  width: 18px;
  height: 18px;
`;

const StyledAppleIcon = styled(AppleLogo)`
  position: absolute;
  fill: white;
  left: 10px;
  width: 32px;
  height: 32px;
`;

export default function LoginButton({ variant, to }: LoginButtonProps) {
  const renderIcon = () => {
    switch (variant) {
      case "kakaoLogin":
        return <StyledKakaoIcon />;
      case "naverLogin":
        return <StyledNaverIcon />;
      case "appleLogin":
        return <StyledAppleIcon />;
    }
  };

  const renderText = () => {
    switch (variant) {
      case "kakaoLogin":
        return "카카오로 로그인";
      case "naverLogin":
        return "네이버로 로그인";
      case "appleLogin":
        return "Apple로 로그인";
    }
  };

  return (
    <StyledButton variant={variant} to={to}>
      {renderIcon()}
      <ButtonText>{renderText()}</ButtonText>
    </StyledButton>
  );
}
