import styled from "styled-components";
import FeedList from "../components/FeedList";

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
  // 날짜 차이를 구해서 "오늘", "어제", "n일 전"으로 변환하는 함수
  const getDaysAgoLabel = (dateString: string): string => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "어제";
    return `${diffDays}일 전`;
  };
  return (
    <div>
      <Daysago>오늘</Daysago>
      <ListContainer>
        <FeedList />
        <FeedList />
      </ListContainer>
    </div>
  );
}
