import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UserReviewsType } from "src/apis/review.type";
import { getUserReviews } from "src/apis/review";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import TrailReviewCard from "src/components/TrailReviewCard";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const lastIdRef = useRef<number | undefined>(undefined);
  const observer = useRef<IntersectionObserver>();

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

  // ✅ 마지막 리뷰 요소 감지해서 자동 로딩
  const lastReviewElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          console.log(
            lastIdRef.current
          );
          loadMoreReviews();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasNext, loadMoreReviews]
  );

  useEffect(() => {
    loadMoreReviews();
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);
  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="내가 작성한 리뷰" />
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
                walkwayId={review.walkwayId}
                onClick={() =>
                  navigate(`/main/recommend/detail/${review.walkwayId}`)
                }
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
