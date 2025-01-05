import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TrailReviewCard from "../../components/TrailReviewCard";
import { UserReviewsType } from "src/apis/review.type";
import { getUserReviews } from "src/apis/review";

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
const Message = styled.div`
  font-size: 16px;
  color: #888;
`;
function TrailReviewPage() {
  const [reviews, setReviews] = useState<UserReviewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        const response = await getUserReviews();
        console.log(response);
        setReviews(response.reviews);
        setError(null);
      } catch (error) {
        setError("리뷰를 가져오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
      <List>
        {reviews.map((review) => (
          <TrailReviewCard
            key={review.reviewId}
            trailName={review.walkwayName}
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
