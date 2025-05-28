import { theme } from "src/styles/colors/theme";
import { useState } from "react";
import { BiCalendar, BiSolidToggleLeft } from "react-icons/bi";
import styled from "styled-components";
import { BsClock } from "react-icons/bs";

interface RecruitFormProps {
  onSubmit: (date: string, time: string, peopleCount?: number) => void;
}
const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;
const SelectItem = styled.div`
  margin: 0.4rem 0;
  border-bottom: 1px solid ${theme.Gray300};
`;
const DateInput = styled.input`
  appearance: none;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  color: transparent;

  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

const TimeInput = styled.input`
  border: 1px red solid;
  font-size: 14px;
  outline: none;
  background: none;
  opacity: 0;
  &::-webkit-calendar-picker-indicator {
    //display: none;
    -webkit-appearance: none;
  }
`;
const LittleTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.Gray500};
`;
const InputNumberContainer = styled.div`
  width: 90%;
  height: 2.5rem;
  border: 2px solid ${theme.Green500};
  border-radius: 16px;
  padding: 0 1rem;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  text-align: right;
  background: transparent;

  &::-webkit-inner-spin-button {
    appearance: none;
  }

  &::placeholder {
    color: ${theme.Gray400};
  }
`;

export default function RecruitForm({ onSubmit }: RecruitFormProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [peopleCount, setPeopleCount] = useState<number | "">("");

  const handleSubmit = () => {
    onSubmit(date, time);
  };

  return (
    <>
      <Title>일정 추가하기</Title>
      <SubTitle>같이 산책할 일정을 선택해주세요</SubTitle>
      <ScheduleContainer>
        <SelectItem>
          <BiCalendar fontSize="30px" />
          <DateInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </SelectItem>
        <SelectItem>
          <BsClock fontSize="25px" />
          <TimeInput
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </SelectItem>
      </ScheduleContainer>
      <SubTitle>
        최대 모집인원 설정하기{" "}
        <BiSolidToggleLeft fontSize="20px" color={theme.Green500} />
      </SubTitle>
      <LittleTitle>최소 2명에서 100명까지 가능합니다.</LittleTitle>
      <InputNumberContainer>
        <StyledInput
          type="number"
          value={peopleCount}
          onChange={(e) =>
            setPeopleCount(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="0"
          min={2}
          max={100}
        />
        <span>명</span>
      </InputNumberContainer>
      <button onClick={handleSubmit}>추가하기</button>
    </>
  );
}
