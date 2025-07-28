import styled from "styled-components";
import FeedList from "../components/FeedList";
import { useEffect, useState } from "react";
import { feedList } from "src/apis/crew/crew.type";
import { getCrewfeedlist } from "src/apis/crew/crew";
import FeedTogether from "../components/FeedTogether";
import { feedStompService } from "src/stomp/feed/feed";
import stompClient from "src/stomp/stompClient";

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
const TogetherContainer = styled.div`
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  height: auto;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const GroupedFeeds = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function Feed({ crewId }: { crewId: number }) {
  const [feeds, setFeeds] = useState<feedList[]>([]);
  const [liveUsers, setLiveUsers] = useState<feedList[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const { data: responseData } = await getCrewfeedlist({ crewId });
        setFeeds(responseData);
        console.log("피드 조회 성공:", responseData);
      } catch (e) {
        console.error("피드 조회 실패:", e);
      }
    };
    if (crewId) fetchFeeds();
  }, [crewId]);

  useEffect(() => {
    if (!crewId) return;

    if (!stompClient.connected) {
      stompClient.activate(); // 연결 시도
    }
    let subscription: any;
    const safeNumber = (x: any) => {
      const n = Number(x);
      return isNaN(n) ? 0 : n;
    };
    feedStompService.connect(() => {
      console.log("stomp 연결 완료");

      subscription = feedStompService.subscribeFeed(crewId, (payload) => {
        console.log("수신한 payload:", payload);
        let realPayload;
        if (Array.isArray(payload)) {
          if (payload.length === 0) {
            console.warn("수신한 payload 배열이 비어있음");
            return;
          }
          realPayload = payload[0];
        } else {
          realPayload = payload;
        }
        if (
          !realPayload ||
          typeof realPayload.memberId === "undefined" ||
          typeof realPayload.distanceMeter === "undefined" ||
          typeof realPayload.timeMin === "undefined"
        ) {
          console.warn("payload 필드 누락 또는 잘못된 데이터:", realPayload);
          return;
        }

        // 숫자 변환 및 객체 생성
        const newUser: feedList = {
          memberId: safeNumber(realPayload.memberId),
          nickname: realPayload.nickname,
          distanceKm: safeNumber(realPayload.distanceMeter),
          durationSec: safeNumber(realPayload.timeMin),
          walkwayHistoryId: Date.now(),
          date: new Date().toISOString(),
        };

        setLiveUsers((prev) => {
          const exists = prev.findIndex((u) => u.memberId === newUser.memberId);
          if (exists !== -1) {
            const updated = [...prev];
            updated[exists] = newUser;
            return updated;
          } else {
            return [...prev, newUser];
          }
        });
      });
    });

    return () => {
      console.log("stomp 연결 해제");
      if (subscription) subscription.unsubscribe();
      feedStompService.disconnect();
    };
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
    if (!feed.date) return acc;
    const label = getDaysAgoLabel(feed.date);
    if (!acc[label]) acc[label] = [];
    acc[label].push(feed);
    return acc;
  }, {} as Record<string, feedList[]>);

  return (
    <>
      <Daysago>같이 산책</Daysago>
      <TogetherContainer>
        {liveUsers.length === 0 ? (
          <span style={{ color: "#888", fontSize: "14px" }}>
            현재 같이 산책중인 사용자가 없습니다.
          </span>
        ) : (
          liveUsers.slice(0, 4).map((item) => (
            <FeedTogether
              key={item.memberId}
              mode="live"
              nickname={item.nickname}
              durationSec={Number(item.durationSec)} // ← 여기!
              distanceKm={Number(item.distanceKm)} // ← 여기!
            />
          ))
        )}
      </TogetherContainer>

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
    </>
  );
}
