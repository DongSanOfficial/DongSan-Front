import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { BsClock } from "react-icons/bs";
import styled from "styled-components";

const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #ccc;
`;

interface StyledButtonProps {
  hasValue: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  padding: 0;
  color: ${(props) => (props.hasValue ? "#000" : "#aaa")};
  cursor: pointer;
`;

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <StyledButton onClick={onClick} ref={ref} hasValue={!!value}>
      {value || "시간 선택"}
    </StyledButton>
  )
);

CustomInput.displayName = "CustomTimeInput";

interface CustomTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export default function CustomTimePicker({
  selected,
  onChange,
}: CustomTimePickerProps) {
  return (
    <PickerWrapper>
      <BsClock fontSize="20px" />
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeCaption="시간"
        dateFormat="HH:mm"
        customInput={<CustomInput />}
        popperPlacement="bottom-start"
      />
    </PickerWrapper>
  );
}
