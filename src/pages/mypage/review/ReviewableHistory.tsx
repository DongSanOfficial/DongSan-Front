import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import TrailCardAll from "src/components/TrailCardAll_View";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import { getReviewRecord } from "src/apis/review";
import { walkwayHistoryType } from "src/apis/review.type";
import { theme } from "src/styles/colors/theme";
import { MdRateReview } from "react-icons/md";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 10px;
  max-width: 430px;
  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    max-width: 100%;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const ExploreButton = styled.button`
  background-color: ${theme.Green500};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.Green600};
  }
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
      setReviews((prevReviews) => [...prevReviews, ...response.data]);

      if (response.data.length > 0) {
        lastIdRef.current = response.data[response.data.length - 1].walkwayId;
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

  const navigateToExplore = () => {
    navigate("/main"); // 메인 화면이나 산책로 탐색 화면으로 이동
  };

  return (
    <>
      <AppBar
        onBack={() => navigate("/mypage")}
        title="리뷰작성 가능한 산책로"
      />
      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && reviews.length === 0 ? (
          <EmptyStateContainer>
            <MdRateReview size={40} color={theme.Gray400} />
            <EmptyStateMessage>
              리뷰를 작성할 수 있는 산책로가 없습니다.
              <br />
              산책로를 이용해보세요!
            </EmptyStateMessage>
            <ExploreButton onClick={navigateToExplore}>
              산책로 탐색하기
            </ExploreButton>
          </EmptyStateContainer>
        ) : (
          <List>
            {reviews.map((review) => (
              <div key={review.walkwayId}>
                <TrailCardAll trail={review} onClick={handleHistoryClick} />
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
export default ReviewableHistory;
