import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserReviewsType } from "src/apis/review/review.type";
import { getUserReviews } from "src/apis/review/review";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import TrailReviewCard from "src/components/card/TrailReviewCard";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import { MdRateReview } from "react-icons/md";
import { theme } from "src/styles/colors/theme";
import { useInfiniteScroll } from "src/hooks/useInfiniteScroll";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
  padding: 0 20px;
`;

const EmptyStateMessage = styled.p`
  font-size: 16px;
  color: ${theme.Gray600};
  line-height: 1.5;
  margin: 16px 0;
`;

export default function TrailReviewPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<UserReviewsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const lastIdRef = useRef<number | undefined>(undefined);

  const loadMoreReviews = useCallback(async () => {
    if (loading || !hasNext) return;

    try {
      setLoading(true);
      const response = await getUserReviews({
        size: 10,
        lastId: lastIdRef.current,
      });

      setReviews((prev) => [...prev, ...response.data]);
      setHasNext(response.hasNext);

      if (response.data.length > 0) {
        const newLastId = response.data[response.data.length - 1].reviewId;
        lastIdRef.current = newLastId;
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "리뷰 조회에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, [loading, hasNext]);

  const { lastElementRef } = useInfiniteScroll({
    hasNext,
    loading,
    onLoadMore: loadMoreReviews,
  });

  useEffect(() => {
    loadMoreReviews();
  }, []);

  return (
    <>
      <AppBar onBack={() => navigate("/mypage")} title="내가 작성한 리뷰" />
      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && reviews.length === 0 ? (
          <EmptyStateContainer>
            <MdRateReview size={40} color={theme.Gray400} />
            <EmptyStateMessage>아직 작성한 리뷰가 없습니다.</EmptyStateMessage>
          </EmptyStateContainer>
        ) : (
          <List>
            {reviews.map((review, index) => (
              <div
                key={review.reviewId}
                ref={index === reviews.length - 1 ? lastElementRef : undefined}
              >
                <TrailReviewCard
                  trailName={review.walkwayName}
                  date={review.date}
                  content={review.content}
                  rating={review.rating}
                  walkwayId={review.walkwayId}
                  onClick={() =>
                    navigate(`/main/recommend/detail/${review.walkwayId}`, {
                      state: { from: "myReviews" },
                    })
                  }
                />
                <hr />
              </div>
            ))}
          </List>
        )}

        {loading && <LoadingSpinner />}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
