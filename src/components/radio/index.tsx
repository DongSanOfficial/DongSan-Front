import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  display: none;
`;

const CustomRadio = styled.span<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ checked }) => (checked ? theme.Green500 : "#ccc")};
  border-radius: 50%;
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    width: 8px;
    height: 8px;
    background: ${theme.Green500};
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
  }
`;

interface Option {
  label: string;
  value: string;
}

interface RadioProps {
  options: Option[];
  selectedValue: string;
  onChange: (val: string) => void;
}

export default function Radio({ options, selectedValue, onChange }: RadioProps) {
  return (
    <Container>
      <RadioWrapper>
        {options.map((option) => {
          const isChecked = selectedValue === option.value;
          return (
            <RadioLabel key={option.value}>
              <HiddenRadio
                name="radio-button"
                value={option.value}
                checked={isChecked}
                onChange={() => onChange(option.value)}
              />
              <CustomRadio checked={isChecked} />
              {option.label}
            </RadioLabel>
          );
        })}
      </RadioWrapper>
    </Container>
  );
}