import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TrailReviewCard from "../../components/TrailReviewCard";
import { showReviewContent, showReviewRating } from "src/apis/review";
import { ReviewContentType, ReviewRatingType } from "src/apis/review.type";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  height: calc(100dvh - 126px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
const SortContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0.5rem;
`;
const SortType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 6.0625rem;
  height: 1.875rem;
  border-radius: 3.125rem;
  border: 1px solid #828485;
  background: #fff;
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 0.5rem;
  width: 6.5rem;
`;

const DropdownItem = styled.div`
  padding: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  fill: number;
}

const Star: React.FC<StarProps> = ({ fill }) => {
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        background: `linear-gradient(to right, #ffc107 ${fill}%, #e4e5e9 ${fill}%)`,
        clipPath: `polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        )`,
      }}
    />
  );
};

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
  <BarContainer>
    <Bar style={{ width: `${percent}%` }} />
  </BarContainer>
);

// Main component
const ReviewCheck = () => {
  const { walkwayId = "", sort = "rating" } = useParams<{
    walkwayId: string;
    sort: string;
  }>();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<ReviewContentType[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewRatingType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<string>("rating");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          showReviewContent(walkwayId, sortType),
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
  }, [walkwayId, sortType]);

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const decimalPart = (rating - fullStars) * 100;

    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) return <Star key={index} fill={100} />;
      if (index === fullStars) return <Star key={index} fill={decimalPart} />;
      return <Star key={index} fill={0} />;
    });

    return <div style={{ display: "flex" }}>{stars}</div>;
  };

  const handleSortChange = (newType: string) => {
    setSortType(newType);
    navigate(`/main/review/${walkwayId}/content?sort=${newType}`); // URL 업데이트
  };
  const ratingData = [
    { label: 5, percent: reviewStats?.five ?? 0 },
    { label: 4, percent: reviewStats?.four ?? 0 },
    { label: 3, percent: reviewStats?.three ?? 0 },
    { label: 2, percent: reviewStats?.two ?? 0 },
    { label: 1, percent: reviewStats?.one ?? 0 },
  ];
  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="산책로 리뷰" />
      <Wrapper>
        <RatingsContainer>
          <RatingLeft>
            <StarLength>{reviewStats?.rating.toFixed(1)}</StarLength>
            <StarContainer>
              <StarRating rating={reviewStats?.rating ?? 0} />
            </StarContainer>
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
        <SortContainer>
          <SortType
            onClick={() => {
              setIsDropdownOpen((prev) => !prev);
            }}
          >
            {sortType === "rating" ? "별점순" : "최근순"}
            <MdKeyboardArrowDown />
          </SortType>
          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleSortChange("rating")}>
                별점순
              </DropdownItem>
              <DropdownItem onClick={() => handleSortChange("latest")}>
                최근순
              </DropdownItem>
            </DropdownMenu>
          )}
        </SortContainer>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading &&
          !error &&
          reviews.map((review) => (
            <div key={review.reviewId}>
              <TrailReviewCard
                trailName={review.nickname}
                date={review.date}
                content={review.content}
                rating={review.rating}
                period={review.period}
              />
              <hr />
            </div>
          ))}
      </Wrapper>{" "}
      <BottomNavigation />
    </>
  );
};

export default ReviewCheck;
