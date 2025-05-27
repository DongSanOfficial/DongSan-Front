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
  min-height: 100px;
  padding: 10px 10px 15px 10px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.Gray300};
  border-radius: 6px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
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
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {showCounter && <Counter>{`${value.length} / ${maxLength}`}</Counter>}
      </TextareaWrapper>
    </Wrapper>
  );
}