import styled from "styled-components";

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
        {options.map((option) => (
          <RadioLabel key={option.value}>
            <input
              type="radio"
              name="radio-button"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </RadioLabel>
        ))}
      </RadioWrapper>
    </Container>
  );
}