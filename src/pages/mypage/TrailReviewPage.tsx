import React from "react";
import styled from "styled-components";
import TrailReviewCard from "../../components/TrailReviewCard";

interface Review {
  id: number;
  trailName: string;
  date: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    trailName: "산책로1",
    date: "2024.09.25",
    content: "산책로가 이뻐요 8시쯤 가세요 근데 벌레 개많음 ㅜ",
    rating: 3,
  },
  {
    id: 2,
    trailName: "산책로2",
    date: "2024.09.26",
    content: "경치 좋고 산책하기 좋아요, 하지만 조심하세요.",
    rating: 4,
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
`;

function TrailReviewPage() {
  return (
    <Wrapper>
      <List>
        {reviews.map((review) => (
          <TrailReviewCard
            key={review.id}
            trailName={review.trailName}
            date={review.date}
            content={review.content}
            rating={review.rating}
          />
        ))}
      </List>
    </Wrapper>
  );
}

export default TrailReviewPage;
