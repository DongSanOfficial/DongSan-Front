import { theme } from "src/styles/colors/theme";
import { useState } from "react";
import styled from "styled-components";
import ToggleSwitch from "src/components/toggle/ToggleSwitch";
import CustomDatePicker from "./CustomDate";
import CustomTimePicker from "./CustomTime";
import CheckButton from "src/components/button/CheckButton";
import { createCowalk } from "src/apis/crew/crew";
import { useLocation } from "react-router-dom";
import { RecruitCowalker } from "src/apis/crew/crew.type";
import { useToast } from "src/context/toast/useToast";

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
  width: 95%;
  margin: 0 auto;
  font-size: 14px;
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
  text-align: left;
  background: transparent;
  color: ${({ disabled }) => (disabled ? theme.Gray400 : theme.Black)};

  &::-webkit-inner-spin-button {
    appearance: none;
  }

  &::placeholder {
    color: ${theme.Gray400};
  }
`;
const TimeRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface RecruitFormProps {
  onSubmit: (
    params: RecruitCowalker & { crewId: number }
  ) => void | Promise<void>;
}

export default function RecruitForm({ onSubmit }: RecruitFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState<number | "">("");
  const [isLimitEnabled, setIsLimitEnabled] = useState(true);
  const [memo, setMemo] = useState<string>("");
  const location = useLocation();
  const crewId = location.state?.crewId;

  const { showToast } = useToast();

  const calculateDuration = () => {
    if (!startDate || !startTime || !endTime) return null;

    const start = new Date(startDate);
    start.setHours(
      startTime.getHours(),
      startTime.getMinutes(),
      startTime.getSeconds()
    );

    const end = new Date(startDate);
    end.setHours(
      endTime.getHours(),
      endTime.getMinutes(),
      endTime.getSeconds()
    );

    // endTime이 startTime보다 빠르면 다음날로 간주
    if (end <= start) {
      end.setDate(end.getDate() + 1);
    }

    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours;
  };

  const duration = calculateDuration();
  const handleSubmit = async () => {
    try {
      if (!startDate || !startTime || !endTime || !crewId) return;
      if (endTime < startTime) {
        showToast(
          "종료시간보다 시작시간이 더 이릅니다. 시간을 다시 설정해주세요.",
          "error"
        );
        return;
      }
      if (duration === null || duration < 1) {
        showToast("산책 시간은 최소 1시간 이상이어야 합니다.", "error");
        return;
      }
      if (duration === null || duration > 3) {
        showToast("산책 시간은 최대 3시간 이내여야 합니다.", "error");
        return;
      }

      const startYear = startDate.getFullYear();
      const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작
      const startDay = startDate.getDate().toString().padStart(2, "0");
      const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
      const formattedStartTime = `${startTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${startTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${startTime
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const formattedEndTime = `${endTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${endTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${endTime.getSeconds().toString().padStart(2, "0")}`;

      const requestBody = {
        crewId,
        startDate: formattedStartDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        limitEnable: isLimitEnabled,
        ...(isLimitEnabled &&
          peopleCount !== "" && {
            memberLimit: Number(peopleCount),
          }),
        memo,
      };

      const cowalkId = await createCowalk(requestBody);
      console.log("생성된 cowalkId:", cowalkId);
      onSubmit({
        crewId,
        startDate: formattedStartDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        limitEnable: isLimitEnabled,
        ...(isLimitEnabled &&
          peopleCount !== "" && {
            memberLimit: Number(peopleCount),
          }),
        memo,
      });
      console.log("추가된 일정:", requestBody);
    } catch (error) {
      console.error("산책 생성 실패:", error);
    }
  };

  const isFormValid =
    startDate !== null &&
    startTime !== null &&
    endTime !== null &&
    (!isLimitEnabled ||
      (typeof peopleCount === "number" &&
        peopleCount >= 2 &&
        peopleCount <= 100)) &&
    memo.trim().length > 0;

  return (
    <>
      <Title>일정 추가하기</Title>
      <SubTitle>
        같이 산책할 일정을 선택해주세요 <span style={{ color: "red" }}>*</span>
      </SubTitle>
      <ScheduleContainer>
        <TimeRangeWrapper>
          <CustomDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </TimeRangeWrapper>
      </ScheduleContainer>

      <ScheduleContainer>
        <TimeRangeWrapper>
          <CustomTimePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
          />
          <span>~</span>
          <CustomTimePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
          />
        </TimeRangeWrapper>
      </ScheduleContainer>
      <SubTitle>
        최대 모집인원 설정하기{" "}
        <ToggleSwitch
          isOn={isLimitEnabled}
          //label={isLimitEnabled ? "비공개" : "전체공개"}
          readOnly={false}
          onChange={() => setIsLimitEnabled((prev) => !prev)}
        />
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

      <SubTitle>한줄 소개</SubTitle>
      <StyledInput
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="같이 산책할 내용을 적어주세요"
        min={2}
        max={200}
      />

      <CheckButton
        active={isFormValid}
        label="추가하기"
        onClick={handleSubmit}
      />
    </>
  );
}
