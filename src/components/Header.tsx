import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeftIcon } from "../assets/svg/ArrowLeftIcon.svg";



interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}


const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  max-width: 430px;
  margin: 0 auto;
  padding: 20px 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Title = styled.h1`
  font-size: 1.1rem;
  margin: 0;
  width: 100%;
  text-align: center;
`;
const Header = ({ title, showBackButton, onBack }: HeaderProps) => {
  return (
    <HeaderContainer>
      {showBackButton && (
        <BackButton onClick={onBack}>
          <ArrowLeftIcon />
        </BackButton>
      )}
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default Header;