import React, { ReactNode } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/svg/ArrowLeftIcon.svg";

interface AppBarProps {
  title?: ReactNode;
  onBack?: () => void;
  rightIcon?: ReactNode;
  onRightClick?: () => void;
}

const AppBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  height: 56px;
  z-index: 20;
  background-color: white;
`;


const IconButton = styled.div`
  cursor: pointer;
  pointer-events: auto;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  margin: 0 auto;
  z-index: 1;
`;

const RightIconContainer = styled.div`
  cursor: pointer;
  pointer-events: auto;
  margin-left: auto;
  z-index: 2;
`;

const AppBar = ({ title, onBack, rightIcon, onRightClick }: AppBarProps) => {
  return (
    <AppBarContainer>
      {onBack && (
        <IconButton onClick={onBack}>
          <ArrowLeft />
        </IconButton>
      )}
      <Title>{title}</Title>
      {rightIcon && (
        <RightIconContainer onClick={onRightClick}>
          {rightIcon}
        </RightIconContainer>
      )}
    </AppBarContainer>
  );
};

export default AppBar;
