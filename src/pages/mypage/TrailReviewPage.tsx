import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TrailReviewCard from "../../components/TrailReviewCard";
import { UserReviewsType } from "src/apis/review.type";
import { getUserReviews } from "src/apis/review";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "src/components/loading/LoadingSpinner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
`;
function TrailReviewPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<UserReviewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        const response = await getUserReviews({ size: 10 });
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

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="내 산책로" />
      <Wrapper>
        <List>
          {reviews.map((review) => (
            <div>
              <TrailReviewCard
                key={review.reviewId}
                trailName={review.walkwayName}
                date={review.date}
                content={review.content}
                rating={review.rating}
              />
              <hr />
            </div>
          ))}
        </List>
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

export default TrailReviewPage;
