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

export default function Feed() {
  const location = useLocation();
  const crewId = location.state?.crewId;
  const [feeds, setFeeds] = useState<feedList[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const { data: responseData } = await getCrewfeedlist({ crewId });
        console.log(responseData);
        setFeeds(responseData);
      } catch (e) {
        console.error("피드 조회 실패:", e);
      }
    };
    fetchFeeds();
  }, [crewId]);

  return (
    <ListContainer>
      {feeds.map((item) => (
        <div key={item.walkwayHistoryId}>
          <FeedList
            date={item.date}
            nickname={item.nickname}
            distanceKm={item.distanceKm}
          />
        </div>
      ))}
    </ListContainer>
  );
}
