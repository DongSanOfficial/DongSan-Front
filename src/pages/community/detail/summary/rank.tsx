import { useState, useEffect } from "react";
import styled from "styled-components";
import { addDays, isAfter, format, startOfWeek, startOfMonth } from "date-fns";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import DropDownButton from "src/components/button/DropDownButton";
import RankItem from "../components/RankItem";
import DateSelector from "../components/DateSelector";
import { getCrewRanking } from "src/apis/crew/crew";
import { CrewRankingItem } from "src/apis/crew/crew.type";

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

export default function RankDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { crewId } = location.state ?? {};


  console.log("location.state:", location.state);
console.log("crewId:", crewId);


  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [sort, setSort] = useState<"distance" | "duration">("distance");
  const [baseDate, setBaseDate] = useState(new Date());
  const [rankItems, setRankItems] = useState<CrewRankingItem[]>([]);

  useEffect(() => {
    if (!crewId) return;
  
    const requestDate = format(
      period === "daily"
        ? baseDate
        : period === "weekly"
        ? startOfWeek(baseDate, { weekStartsOn: 1 })
        : startOfMonth(baseDate),
      "yyyy-MM-dd"
    );
  
    const fetchRankData = async () => {
      try {
        const res = await getCrewRanking(crewId, {
          period,
          sort,
          date: requestDate,
        });
        setRankItems(res.data);
      } catch (e) {
        console.error("랭킹 불러오기 실패", e);
      }
    };
  
    fetchRankData();
  }, [crewId, period, sort, baseDate]);
  


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
        title="전체 랭킹 보기"
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
        {rankItems.map((item, index) => (
          <RankItem
            key={`${item.memberId}-${index}`}
            rank={index + 1}
            name={item.nickname}
            distance={item.distanceKm}
            time={item.durationHour}
          />
        ))}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
