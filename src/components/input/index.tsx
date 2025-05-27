import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ isFull: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid ${theme.Gray300};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom: 1.5px solid ${theme.Green500};
  }
`;

const Counter = styled.div<{ isFull: boolean }>`
  position: absolute;
  right: 5px;
  bottom: 4px;
  font-size: 10px;
  color: ${({ isFull }) => (isFull ? theme.Red500 : theme.Gray500)};
`;

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
  showCounter?: boolean;
  placeholder?: string;
}

export default function TextInput({
  value,
  onChange,
  maxLength,
  showCounter = true,
  placeholder,
}: TextInputProps) {
  const isFull = value.length >= maxLength;

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          isFull={isFull}
          placeholder={placeholder}
        />
        {showCounter && (
          <Counter isFull={isFull}>{`${value.length} / ${maxLength}`}</Counter>
        )}
      </InputWrapper>
    </Wrapper>
  );
}