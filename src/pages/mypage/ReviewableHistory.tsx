import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import TrailCardAll from "src/components/TrailCardAll_View";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import { getReviewRecord } from "src/apis/review";
import { walkwayHistoryType } from "src/apis/review.type";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 10px;
  max-width: 430px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// const LoadingSpinner = styled.div`
//   text-align: center;
//   padding: 20px;
// `;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

function ReviewableHistory() {
  const navigate = useNavigate();
  const [reviews, setReviews] = React.useState<walkwayHistoryType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasNext, setHasNext] = React.useState(true);
  const lastIdRef = useRef<number | undefined>(undefined);
  const observer = useRef<IntersectionObserver>();

  const loadTrails = useCallback(async () => {
    if (loading || !hasNext) return;

    try {
      setLoading(true);
      const response = await getReviewRecord({
        size: 10,
        lastId: lastIdRef.current,
      });
      setReviews((prevReviews) => [
        ...prevReviews,
        ...response.data,
      ]);

      if (response.data.length > 0) {
        lastIdRef.current =
          response.data[
            response.data.length - 1
          ].walkwayId;
      }
      //setHasNext(response.hasNext);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "산책로 조회에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, [loading, hasNext]);

  useEffect(() => {
    loadTrails();
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleHistoryClick = useCallback(
    (walkwayId: number) => {
      navigate(`/main/review/${walkwayId}`);
    },
    [navigate]
  );
  return (
    <>
      <AppBar
        onBack={() => navigate("/mypage")}
        title="리뷰작성 가능한 산책로"
      />
      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <List>
          {reviews.map((review, index) => (
            <div key={review.walkwayId}>
              <TrailCardAll trail={review} onClick={handleHistoryClick} />
            </div>
          ))}
        </List>
        {loading && <LoadingSpinner />}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
export default ReviewableHistory;
