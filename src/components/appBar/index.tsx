import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../assets/svg/ArrowLeftIcon.svg";

interface AppBarProps {
  title?: string;
  onBack?: () => void;
}

const AppBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  max-width: 430px;
  margin: 0 auto;
  height: 56px;
  z-index: 20;
  background-color: white;
`;

const IconButton = styled.div`
  cursor: pointer;
  pointer-events: auto;
`;

const Title = styled.h1`
  font-size: 1.1rem;
  flex: 1;
  text-align: center;
`;

const AppBar = ({ title, onBack }: AppBarProps) => {
  return (
    <AppBarContainer>
      <IconButton onClick={onBack}>
        <ArrowLeft />
      </IconButton>
      <Title>{title}</Title>
    </AppBarContainer>
  );
};

export default AppBar;
