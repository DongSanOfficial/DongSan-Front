import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TrailReviewCard from "../../components/TrailReviewCard";
import { getUserReviews, showReviewRating } from "src/apis/review";
import { ReviewRatingType, UserReviewsType } from "src/apis/review.type";
import { useParams } from "react-router-dom";

// Styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const RatingsContainer = styled.div`
  background: #f6f8f9;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
`;

const RatingLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StarLength = styled.h2`
  font-size: 35px;
  font-family: "Lalezar";
`;

const RatingRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #ffc107;
`;

const BarContainer = styled.div`
  background: #e4e5e9;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px;
  width: 130px;
`;

const Bar = styled.div`
  height: 10px;
  background: #ffc107;
`;

const RatingBreakdown = styled.div`
  display: flex;
  justify-content: row;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
  width: 10px;
`;

// TypeScript interfaces
interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => (
  <span style={{ color: filled ? "#ffc107" : "#e4e5e9" }}>★</span>
);

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
  <BarContainer>
    <Bar style={{ width: `${percent}%` }} />
  </BarContainer>
);

// Main component
const ReviewCheck: React.FC = () => {
  const { walkwayId } = useParams<{ walkwayId: string }>();
  const [reviews, setReviews] = useState<UserReviewsType[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewRatingType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!walkwayId) {
        setError("산책로 ID가 없습니다.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const [reviewResponse, reviewStatsResponse] = await Promise.all([
          getUserReviews(),
          showReviewRating(walkwayId),
        ]);
        setReviews(reviewResponse.reviews);
        setReviewStats(reviewStatsResponse);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("리뷰를 가져오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [walkwayId]);

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} filled={index < Math.floor(reviewStats?.rating ?? 0)} />
  ));
  const ratingData = [
    { label: 5, percent: reviewStats?.five ?? 0 },
    { label: 4, percent: reviewStats?.four ?? 0 },
    { label: 3, percent: reviewStats?.three ?? 0 },
    { label: 2, percent: reviewStats?.two ?? 0 },
    { label: 1, percent: reviewStats?.one ?? 0 },
  ];
  return (
    <Wrapper>
      <RatingsContainer>
        <RatingLeft>
          <StarLength>{reviewStats?.rating.toFixed(1)}</StarLength>
          <StarContainer>{stars}</StarContainer>
          <span>{`후기 ${reviewStats?.reviewCount}개`}</span>
        </RatingLeft>
        <RatingRight>
          {ratingData.map((data) => (
            <RatingBreakdown key={data.label}>
              <Label>{data.label}</Label>
              <ProgressBar percent={data.percent} />
              <Label>{`${data.percent}%`}</Label>
            </RatingBreakdown>
          ))}
        </RatingRight>
      </RatingsContainer>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading &&
        !error &&
        reviews.map((review) => (
          <div key={review.reviewId}>
            <TrailReviewCard
              trailName={review.walkwayName}
              date={review.date}
              content={review.content}
              rating={review.rating}
            />
            <hr />
          </div>
        ))}
    </Wrapper>
  );
};

export default ReviewCheck;
