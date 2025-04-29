import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TrailReviewCard from "../../components/TrailReviewCard";
import { showReviewContent, showReviewRating } from "src/apis/review";
import { ReviewContentType, ReviewRatingType } from "src/apis/review.type";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import StarCount from "src/components/review/starCount";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import Divider from "src/components/Divider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  height: calc(100dvh - 126px);
  overflow: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 50px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    padding: 25px 40px;
    max-width: 900px;
    padding: 0 50px;
  }
`;

const RatingsContainer = styled.div`
  background: #f6f8f9;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 100%;
    border-radius: 15px;
    padding: 25px;
    margin-top: 20px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    width: 100%;
    border-radius: 20px;
    padding: 30px;
  }
`;

const SortContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 15px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 1rem;
    max-width: 100%;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 600px;
  }
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
  cursor: pointer;
  font-size: 15px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 9rem;
    height: 3rem;
    font-size: 25px;
  }
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 7.5rem;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
`;

const DropdownItem = styled.div`
  padding: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 0.75rem;
    font-size: 1.1rem;
  }
`;

const RatingLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 0 10px;
  }
`;

const StarLength = styled.h2`
  font-size: 35px;
  font-family: "Lalezar";

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 45px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 50px;
  }
`;

const ReviewCount = styled.span`
  font-size: 15px;
  margin-top: 13px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 25px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 30px;
  }
`;

const RatingRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin-left: 50px;
  }
`;

const BarContainer = styled.div`
  background: #e4e5e9;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px;
  width: 120px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 300px;
    border-radius: 6px;
    margin: 6px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    width: 220px;
  }
`;

const Bar = styled.div`
  height: 10px;
  background: #ffc107;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    height: 20px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    height: 25px;
  }
`;

const RatingBreakdown = styled.div`
  display: flex;
  justify-content: row;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 3px auto;
  }
`;

const Label = styled.span`
  font-size: 12px;
  color: #666;
  width: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 20px;
    width: 15px;
  }
`;

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => (
  <BarContainer>
    <Bar style={{ width: `${percent}%` }} />
  </BarContainer>
);

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

  const handleSortChange = (newType: string) => {
    setSortType(newType);
    navigate(`/main/review/${walkwayId}/content?sort=${newType}`);
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
            <StarCount rating={reviewStats?.rating ?? 0} size={24} />
            <ReviewCount>{`후기 ${reviewStats?.reviewCount}개`}</ReviewCount>
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
        {loading && <LoadingSpinner />}
        {error && <div>{error}</div>}
        {!loading &&
          !error &&
          reviews?.map((review) => (
            <>
              <div key={review.reviewId}>
                <TrailReviewCard
                  trailName={review.nickname}
                  date={review.date}
                  content={review.content}
                  rating={review.rating}
                  period={review.period}
                />
              </div>
              <Divider />
            </>
          ))}
      </Wrapper>
      <BottomNavigation />
    </>
  );
};

export default ReviewCheck;
