import { theme } from "src/styles/colors/theme";
import { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "src/components/toggle/ToggleSwitch";
import CustomDatePicker from "./CustomDate";
import CustomTimePicker from "./CustomTime";

interface RecruitFormProps {
  onSubmit: (date: string, time: string, peopleCount?: number) => void;
}
const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;
const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin: 0.5rem 0;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 80%;
  margin: 0 auto;
`;
const SelectItem = styled.label`
  margin: 0.4rem 0;
  border-bottom: 1px solid ${theme.Gray300};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  height: 2.5rem;
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

const StyledInput = styled.input<{ disabled?: boolean }>`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  text-align: right;
  background: transparent;
  color: ${({ disabled }) => (disabled ? theme.Gray400 : theme.Black)};

  &::-webkit-inner-spin-button {
    appearance: none;
  }

  &::placeholder {
    color: ${theme.Gray400};
  }
`;

export default function RecruitForm({ onSubmit }: RecruitFormProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState<number | "">("");
  const [isLimitEnabled, setIsLimitEnabled] = useState(true);

  const handleSubmit = () => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    const formattedTime = time
      ? `${time.getHours().toString().padStart(2, "0")}:${time
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : "";

    onSubmit(
      formattedDate,
      formattedTime,
      isLimitEnabled ? Number(peopleCount) : undefined
    );
  };

  return (
    <>
      <Title>일정 추가하기</Title>
      <SubTitle>
        같이 산책할 일정을 선택해주세요 <span style={{ color: "red" }}>*</span>
      </SubTitle>
      <ScheduleContainer>
        <SelectItem>
          <CustomDatePicker
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </SelectItem>
        <SelectItem>
          <CustomTimePicker
            selected={time}
            onChange={(date) => setTime(date)}
          />
        </SelectItem>
      </ScheduleContainer>
      <SubTitle>
        최대 모집인원 설정하기{" "}
        {isLimitEnabled ? (
          <ToggleSwitch
            isOn={true}
            label="전체공개"
            readOnly={false}
            onChange={() => setIsLimitEnabled((prev) => !prev)}
          ></ToggleSwitch>
        ) : (
          <ToggleSwitch
            isOn={false}
            label="비공개"
            readOnly={false}
            onChange={() => setIsLimitEnabled((prev) => !prev)}
          ></ToggleSwitch>
        )}{" "}
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
          disabled={!isLimitEnabled}
        />
        <span>명</span>
      </InputNumberContainer>
      <button onClick={handleSubmit}>추가하기</button>
    </>
  );
}
