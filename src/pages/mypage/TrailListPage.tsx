import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useNavigate } from "react-router-dom";
import { Trail } from "src/apis/walkway.type";
import { getMyWalkways } from "src/apis/walkway";
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
      console.log("🔍 산책로 요청 시 lastId:", lastIdRef.current);

      const response = await getMyWalkways({
        size: 10,
        lastId: lastIdRef.current,
      });

      setTrails((prev) => [...prev, ...response.walkways]);
      setHasNext(response.hasNext);

      if (response.walkways.length > 0) {
        const newLastId =
          response.walkways[response.walkways.length - 1].walkwayId;
        console.log("📌 응답에서 추출한 새로운 lastId:", newLastId);
        lastIdRef.current = newLastId;
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "산책로 조회에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, [loading, hasNext]);

  // Intersection Observer 설정
  const lastTrailElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          console.log(
            "👀 스크롤이 마지막에 도달했을 때의 lastId:",
            lastIdRef.current
          );
          loadTrails();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasNext, loadTrails]
  );

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
      <AppBar onBack={() => navigate("/mypage")} title="내가 등록한 산책로" />
      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <List>
          {trails.map((trail, index) => (
            <div
              key={trail.walkwayId}
              ref={index === trails.length - 1 ? lastTrailElementRef : null}
            >
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
