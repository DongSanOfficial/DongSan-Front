import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiCalendar } from "react-icons/bi";
import styled from "styled-components";

const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  width: 100%;
  height: 2.5rem;
  border-bottom: 1px solid #ccc;
`;

const StyledFakeInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
  color: ${(props) => (props.value ? "#000" : "#aaa")};
`;

interface CustomDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const CustomInput = forwardRef<HTMLInputElement, any>(
  ({ value, onClick }, ref) => (
    <StyledFakeInput
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      placeholder="날짜 선택"
    />
  )
);

export default function CustomDatePicker({
  selected,
  onChange,
}: CustomDatePickerProps) {
  return (
    <PickerWrapper>
      <BiCalendar fontSize="30px" />
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        customInput={<CustomInput />}
        popperPlacement="bottom-start"
      />
    </PickerWrapper>
  );
}
