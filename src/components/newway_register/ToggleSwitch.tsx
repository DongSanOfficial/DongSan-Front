import React from "react";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
const IsPublic = styled.div`
  font-size: 12px;
  font-weight: 600;
  @media (max-width: 375px) {
    width: 50px;
  }
`;
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 22px;
  border-radius: 15px;
  padding: 3px;
  background-color: #cdcdcd;
`;

const Switch = styled.div<{ isOn: boolean }>`
  width: 34px;
  height: 16px;
  border-radius: 15px;
  background-color: ${(props) => (props.isOn ? "#1b8f6e" : theme.Gray300)};
  position: relative;
  transition: background-color 0.3s ease;
`;

const Toggle = styled.div<{ isOn: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 0px;
  left: ${(props) => (props.isOn ? "18px" : "0px")};
  transition: left 0.3s ease;
`;

const Label = styled.span<{ isOn: boolean }>`
  font-size: 8px;
  font-weight: 500;
  color: ${(props) => (props.isOn ? "#ffffff" : "#494949")};
  position: absolute;
  left: ${(props) => (props.isOn ? "4px" : "16px")};
  top: 3px;
  transition: color 0.3s ease;
`;

interface ToggleSwitchProps {
  isPublic: boolean;
  readOnly?: boolean;
  onChange?: (isPublic: boolean) => void;
}

const ToggleSwitch = ({
  isPublic,
  readOnly = false,
  onChange,
}: ToggleSwitchProps) => {
  const toggleSwitch = () => {
    if (!readOnly && onChange) {
      onChange(!isPublic);
    }
  };

  return (
    <Content>
      <IsPublic>전체공개</IsPublic>
      <SwitchContainer onClick={toggleSwitch}>
        <Switch isOn={isPublic}>
          <Toggle isOn={isPublic} />
          <Label isOn={isPublic}>{isPublic ? "ON" : "OFF"}</Label>
        </Switch>
      </SwitchContainer>
    </Content>
  );
};

export default ToggleSwitch;
