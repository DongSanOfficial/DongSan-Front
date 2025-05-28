import styled from "styled-components";
import { useRef, useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 10px 15px 10px;
  font-size: 14px;
  min-height: 30px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.Gray300};
  box-sizing: border-box;
  overflow: hidden;
  resize: none;
  background: transparent;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-bottom: 1.5px solid ${({ theme }) => theme.Green500};
  }
`;

const Counter = styled.div`
  position: absolute;
  right: 5px;
  bottom: 7px;
  font-size: 10px;
  color: ${({ theme }) => theme.Gray500};
`;

interface TextareaFieldProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  showCounter?: boolean;
  placeholder?: string;
}

export default function TextareaField({
  value,
  onChange,
  maxLength,
  showCounter = true,
  placeholder = "입력해 주세요",
}: TextareaFieldProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <Wrapper>
      <TextareaWrapper>
        <Textarea
          ref={ref}
          value={value}
          rows={1}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {showCounter && <Counter>{`${value.length} / ${maxLength}`}</Counter>}
      </TextareaWrapper>
    </Wrapper>
  );
}