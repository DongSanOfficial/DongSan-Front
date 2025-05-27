import styled from "styled-components";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 48px;
  height: 26px;
  border-radius: 18px;
  padding: 4px;
  background-color: #cdcdcd;
`;

const Switch = styled.div<{ isOn: boolean }>`
  width: 40px;
  height: 18px;
  border-radius: 18px;
  background-color: ${(props) => (props.isOn ? "#1b8f6e" : "#d3d3d3")};
  position: relative;
  transition: background-color 0.3s ease;
`;

const Toggle = styled.div<{ isOn: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 0;
  left: ${(props) => (props.isOn ? "22px" : "0px")};
  transition: left 0.3s ease;
`;

const ToggleLabel = styled.span<{ isOn: boolean }>`
  font-size: 10px;
  font-weight: 500;
  color: ${(props) => (props.isOn ? "#ffffff" : "#494949")};
  position: absolute;
  left: ${(props) => (props.isOn ? "5px" : "18px")};
  top: 2px;
  transition: color 0.3s ease;
`;

interface ToggleSwitchProps {
  label?: string;
  isOn: boolean;
  readOnly?: boolean;
  onChange?: (isOn: boolean) => void;
}

export default function ToggleSwitch({
  label,
  isOn,
  readOnly = false,
  onChange,
}: ToggleSwitchProps) {
  const toggle = () => {
    if (!readOnly && onChange) {
      onChange(!isOn);
    }
  };

  return (
    <ToggleWrapper>
      {label && <Label>{label}</Label>}
      <SwitchContainer onClick={toggle}>
        <Switch isOn={isOn}>
          <Toggle isOn={isOn} />
          <ToggleLabel isOn={isOn}>{isOn ? "ON" : "OFF"}</ToggleLabel>
        </Switch>
      </SwitchContainer>
    </ToggleWrapper>
  );
}
