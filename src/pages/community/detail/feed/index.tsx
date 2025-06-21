import styled from "styled-components";
import FeedList from "../components/FeedList";
import { useEffect, useState } from "react";
import { feedList } from "src/apis/crew/crew.type";
import { getCrewfeedlist } from "src/apis/crew/crew";
import { useLocation } from "react-router-dom";

const Daysago = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin: 0.5rem 0.2rem;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const GroupedFeeds = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function Feed() {
  const location = useLocation();
  const crewId = location.state?.crewId;
  const [feeds, setFeeds] = useState<feedList[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const { data: responseData } = await getCrewfeedlist({ crewId });
        setFeeds(responseData);
      } catch (e) {
        console.error("피드 조회 실패:", e);
      }
    };
    if (crewId) fetchFeeds();
  }, [crewId]);

  const getDaysAgoLabel = (dateStr: string): string => {
    const today = new Date();
    const targetDate = new Date(dateStr); // 문자열을 Date로 바로 변환
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "어제";
    return `${diffDays}일 전`;
  };

  // 🔸 날짜별 그룹핑
  const groupedFeeds: Record<string, feedList[]> = feeds.reduce((acc, feed) => {
    const label = getDaysAgoLabel(feed.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(feed);
    return acc;
  }, {} as Record<string, feedList[]>);

  return (
    <ListContainer>
      {Object.entries(groupedFeeds).map(([label, group]) => (
        <GroupedFeeds key={label}>
          <Daysago>{label}</Daysago>
          {group.map((item) => (
            <FeedList
              key={item.walkwayHistoryId}
              date={item.date}
              nickname={item.nickname}
              distanceKm={item.distanceKm}
            />
          ))}
        </GroupedFeeds>
      ))}
    </ListContainer>
  );
}
