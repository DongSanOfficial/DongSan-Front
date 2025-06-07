import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Trail, WalkwayListResponse } from "src/apis/walkway/walkway.type";
import { getMyWalkways, getLikedWalkways } from "src/apis/walkway/walkway";
import {
  getBookmarkedWalkways,
  getBookmarkTitle,
} from "src/apis/bookmark/bookmark";
import TrailCardAll from "src/components/card/TrailCardAll";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { useInfiniteScroll } from "src/hooks/useInfiniteScroll";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 10px 30px;
  width: 100%;
  margin: 0 auto;

  /* 모바일 환경 (기본) */
  @media screen and (max-width: 767px) {
    max-width: 430px;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) and (max-width: 1023px) {
    max-width: 100%;
    padding: 15px 40px;
    height: calc(100vh - 140px);
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 900px;
    padding: 20px 50px;
    height: calc(100vh - 150px);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 24px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    gap: 30px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
  font-size: 16px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 18px;
    padding: 25px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 16px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 18px;
    padding: 30px;
  }
`;

const CardContainer = styled.div`
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    /* 추가적인 스타일링이 필요하다면 여기에 */
  }
`;

function TrailListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const bookmarkId = queryParams.get("bookmarkId");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [title, setTitle] = useState("산책로 목록");
  const lastIdRef = useRef<number | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const fetchBookmarkName = async (id: number) => {
    try {
      const response = await getBookmarkTitle({ lastId: null, size: 10 });
      const bookmark = response.data.find(
        (item: { bookmarkId: number }) => item.bookmarkId === id
      );
      if (bookmark) setTitle(bookmark.title);
    } catch (error) {
      console.error("북마크 이름 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    if (type === "favorites") {
      setTitle("내가 좋아하는 산책로");
    } else if (type === "bookmarks" && bookmarkId) {
      fetchBookmarkName(parseInt(bookmarkId));
    } else {
      setTitle("내가 등록한 산책로");
    }
  }, [type, bookmarkId]);

  const loadInitialData = async () => {
    try {
      setInitialLoading(true);
      setLoading(true);

      let response: WalkwayListResponse;

      if (type === "favorites") {
        response = await getLikedWalkways({ size: 10 });
      } else if (type === "bookmarks" && bookmarkId) {
        response = await getBookmarkedWalkways({
          bookmarkId: parseInt(bookmarkId),
          size: 10,
        });
      } else {
        response = await getMyWalkways({ size: 10 });
      }

      setTrails(response.data);
      setHasNext(response.hasNext);

      if (response.data.length > 0) {
        lastIdRef.current = response.data[response.data.length - 1].walkwayId;
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "산책로 조회에 실패했습니다."
      );
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const loadMoreData = useCallback(async () => {
    if (loading || !hasNext || !lastIdRef.current) return;

    try {
      setLoading(true);

      let response: WalkwayListResponse;

      if (type === "favorites") {
        response = await getLikedWalkways({
          size: 10,
          lastId: lastIdRef.current,
        });
      } else if (type === "bookmarks" && bookmarkId) {
        response = await getBookmarkedWalkways({
          bookmarkId: parseInt(bookmarkId),
          size: 10,
          lastId: lastIdRef.current,
        });
      } else {
        response = await getMyWalkways({
          size: 10,
          lastId: lastIdRef.current,
        });
      }

      setTrails((prev) => [...prev, ...response.data]);
      setHasNext(response.hasNext);

      if (response.data.length > 0) {
        lastIdRef.current = response.data[response.data.length - 1].walkwayId;
      }
    } catch (error) {
      console.error("추가 데이터 로드 중 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [type, bookmarkId, loading, hasNext]);

  const { lastElementRef } = useInfiniteScroll({
    hasNext,
    loading,
    onLoadMore: loadMoreData,
  });

  useEffect(() => {
    if (!initialLoading && wrapperRef.current) {
      const savedScroll = sessionStorage.getItem("trailListScroll");
      if (savedScroll) {
        requestAnimationFrame(() => {
          wrapperRef.current!.scrollTop = parseInt(savedScroll, 10);
        });
      }
    }
  }, [initialLoading]);

  useEffect(() => {
    setTrails([]);
    setHasNext(true);
    lastIdRef.current = undefined;
    loadInitialData();
  }, [type, bookmarkId]);

  const handleCardClick = (walkwayId: number) => {
    sessionStorage.setItem(
      "trailListScroll",
      String(wrapperRef.current?.scrollTop || 0)
    );
    if (type === "favorites") {
      navigate(`/main/recommend/detail/${walkwayId}`, {
        state: { from: "favorites" },
      });
    } else if (type === "bookmarks") {
      navigate(`/main/recommend/detail/${walkwayId}`, {
        state: { from: "bookmarks", bookmarkId },
      });
    } else {
      navigate(`/mypage/myregister/${walkwayId}`);
    }
  };

  return (
    <>
      <AppBar onBack={() => navigate("/mypage")} title={title} />
      <Wrapper ref={wrapperRef}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!initialLoading && trails.length === 0 && !error && (
          <EmptyMessage>표시할 산책로가 없습니다.</EmptyMessage>
        )}
        <List>
          {trails.map((trail, index) => (
            <CardContainer
              key={trail.walkwayId}
              ref={index === trails.length - 1 ? lastElementRef : null}
            >
              <TrailCardAll
                trail={trail}
                onClick={() => handleCardClick(trail.walkwayId)}
              />
            </CardContainer>
          ))}
        </List>
        {loading && <LoadingSpinner />}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

export default TrailListPage;
