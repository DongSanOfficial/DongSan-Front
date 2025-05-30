import styled from "styled-components";
import { format, startOfWeek, startOfMonth, addDays, isAfter } from "date-fns";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  background-color: white;
  border-radius: 8px;
`;

const DateLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.Black};
`;

interface Props {
  baseDate: Date;
  period: string;
  onPrev: () => void;
  onNext: () => void;
}

export default function DateSelector({
  baseDate,
  period,
  onPrev,
  onNext,
}: Props) {
  const getDisplayLabel = () => {
    if (period === "weekly") {
      const start = startOfWeek(baseDate, { weekStartsOn: 1 });
      const end = addDays(start, 6);
      return `${format(start, "MM.dd")} ~ ${format(end, "MM.dd")}`;
    } else if (period === "monthly") {
      return format(startOfMonth(baseDate), "yyyy.MM");
    } else {
      return format(baseDate, "yyyy.MM.dd");
    }
  };

  const nextDate =
    period === "daily"
      ? addDays(baseDate, 1)
      : period === "weekly"
      ? addDays(baseDate, 7)
      : addDays(baseDate, 30);

  const isNextDisabled = isAfter(nextDate, new Date());

  return (
    <Container>
      <MdChevronLeft size={24} onClick={onPrev} style={{ cursor: "pointer" }} />
      <DateLabel>{getDisplayLabel()}</DateLabel>
      <MdChevronRight
        size={24}
        onClick={onNext}
        style={{
          cursor: isNextDisabled ? "not-allowed" : "pointer",
          opacity: isNextDisabled ? 0.3 : 1,
        }}
      />
    </Container>
  );
}
