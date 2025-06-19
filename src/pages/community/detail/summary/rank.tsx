import { useState } from "react";
import styled from "styled-components";
import { addDays, isAfter } from "date-fns";
import { MdLockOutline } from "react-icons/md";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import DropDownButton from "src/components/button/DropDownButton";
import RankItem from "../components/RankItem";
import DateSelector from "../components/DateSelector";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 126px);
  padding: 0 30px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 10px 0;
`;

const sortOptions = [
  { value: "distance", label: "거리순" },
  { value: "duration", label: "시간순" },
] as const;

const periodOptions = [
  { value: "daily", label: "일간" },
  { value: "weekly", label: "주간" },
  { value: "monthly", label: "월간" },
] as const;

interface RankItemType {
  name: string;
  distance: number;
  time: number;
}

export default function RankDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const crew = location.state?.crew;

  const [period, setPeriod] = useState("daily");
  const [sort, setSort] = useState("distance");
  const [baseDate, setBaseDate] = useState(new Date());

  const mock: RankItemType[] = Array.from({ length: 20 }).map((_, i) => ({
    name: `홍길동 ${i + 1}`,
    distance: Math.round(Math.random() * 20 * 10) / 10,
    time: Math.round(Math.random() * 5 * 10) / 10,
  }));

  const sortedRankItems = [...mock].sort((a, b) =>
    sort === "distance" ? b.distance - a.distance : b.time - a.time
  );

  /*
  서버에 전송할 날짜 확인용 콘솔
  const getRequestDate = () => {
    return format(
      period === "daily"
        ? baseDate
        : period === "weekly"
        ? startOfWeek(baseDate, { weekStartsOn: 1 })
        : startOfMonth(baseDate),
      "yyyy-MM-dd"
    );
  };

  useEffect(() => {
    console.log("서버 전송 날짜 확인용:", getRequestDate());
  }, [period, baseDate]);
  */

  const handlePrev = () => {
    setBaseDate((prev) =>
      period === "daily"
        ? addDays(prev, -1)
        : period === "weekly"
        ? addDays(prev, -7)
        : addDays(prev, -30)
    );
  };

  const handleNext = () => {
    const nextDate =
      period === "daily"
        ? addDays(baseDate, 1)
        : period === "weekly"
        ? addDays(baseDate, 7)
        : addDays(baseDate, 30);

    if (!isAfter(nextDate, new Date())) {
      setBaseDate(nextDate);
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <>
      <AppBar
        onBack={handleBack}
        title={
          crew.visibility === "PRIVATE" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {crew.name} <MdLockOutline />
            </div>
          ) : (
            crew.name
          )
        }
      />
      <Wrapper>
        <DateSelector
          baseDate={baseDate}
          period={period}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        <ControlBar>
          <DropDownButton
            options={periodOptions}
            value={period}
            onChange={setPeriod}
            size="small"
          />
          <DropDownButton
            options={sortOptions}
            value={sort}
            onChange={setSort}
            size="small"
          />
        </ControlBar>
        {sortedRankItems.map((item, index) => (
          <RankItem
            key={`${item.name}-${index}`}
            rank={index + 1}
            name={item.name}
            distance={item.distance}
            time={item.time}
          />
        ))}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
