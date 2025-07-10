import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";
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
  text-align: left;
`;

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <StyledButton onClick={onClick} ref={ref} hasValue={!!value}>
      {value || "날짜 선택"}
    </StyledButton>
  )
);

CustomInput.displayName = "CustomDateInput";

export default function CustomDatePicker({
  selected,
  onChange,
}: CustomDatePickerProps) {
  return (
    <PickerWrapper>
      <BiCalendar fontSize="20px" />
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="MM/dd"
        customInput={<CustomInput />}
        popperPlacement="bottom-start"
      />
    </PickerWrapper>
  );
}
