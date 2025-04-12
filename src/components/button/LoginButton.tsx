import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as KakaoLogo } from "../../assets/svg/loginKakao.svg";
import { ReactComponent as NaverLogo } from "../../assets/svg/loginNaver.svg";
import { theme } from "../../styles/colors/theme";

interface LoginButtonProps {
  variant: 'kakaoLogin' | 'naverLogin';
  to: string;
}

const StyledButton = styled(Link)<Pick<LoginButtonProps, 'variant'>>`
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

  ${props => {
    switch(props.variant) {
      case 'kakaoLogin':
        return `
          background-color: ${theme.Kakao};
          color: ${theme.KakaoBtnText};
        `;
      case 'naverLogin':
        return `
          background-color: ${theme.Naver};
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

export default function LoginButton({ variant, to }: LoginButtonProps) {
  return (
    <StyledButton variant={variant} to={to}>
      {variant === 'kakaoLogin' ? <StyledKakaoIcon /> : <StyledNaverIcon />}
      <ButtonText>
        {variant === 'kakaoLogin' ? '카카오로 로그인' : '네이버로 로그인'}
      </ButtonText>
    </StyledButton>
  );
}