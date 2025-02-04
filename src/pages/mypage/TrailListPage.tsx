import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import { Trail } from "src/apis/walkway.type";
import { getTrails } from "src/apis/walkway";
import TrailCardAll from "src/components/TrailCardAll_View";

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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

function TrailListPage() {
  const navigate = useNavigate();
  const [trails, setTrails] = React.useState<Trail[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasNext, setHasNext] = React.useState(true);
  const lastIdRef = useRef<number | undefined>(undefined);
  const observer = useRef<IntersectionObserver>();

  const loadTrails = useCallback(async () => {
    if (loading || !hasNext) return;

    try {
      setLoading(true);
      const response = await getTrails(10, lastIdRef.current);
      setTrails(response.walkways);
      setHasNext(response.hasNext);

      if (response.walkways.length > 0) {
        lastIdRef.current =
          response.walkways[response.walkways.length - 1].walkwayId;
      }
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

  const handleCardClick = useCallback(
    (walkwayId: number) => {
      navigate(`/mypage/myregister/${walkwayId}`);
    },
    [navigate]
  );

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="내가 등록한 산책로" />
      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <List>
          {trails.map((trail, index) => (
            <div key={trail.walkwayId}>
              <TrailCardAll trail={trail} onClick={handleCardClick} />
            </div>
          ))}
        </List>
        {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

export default TrailListPage;
