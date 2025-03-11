import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Trail, WalkwayListResponse } from "src/apis/walkway.type";
import { getMyWalkways, getLikedWalkways } from "src/apis/walkway";
import { getBookmark, getBookmarkedWalkways } from "src/apis/bookmark";
import TrailCardAll from "src/components/TrailCardAll_View";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 10px 30px;
  max-width: 430px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // 북마크 이름을 가져오는 함수
  const fetchBookmarkName = async (id: number) => {
    try {
      const defaultWalkwayId = 1;
      const response = await getBookmark({
        walkwayId: defaultWalkwayId,
        size: 10,
      });
      const bookmark = response.data.find((item) => item.bookmarkId === id);
      if (bookmark) {
        setTitle(bookmark.name);
      }
    } catch (error) {
      console.error("북마크 이름 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    if (type === "favorites") {
      setTitle("내가 좋아하는 산책로");
    } else if (type === "bookmarks" && bookmarkId) {
      const id = parseInt(bookmarkId);
      fetchBookmarkName(id);
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

  const loadMoreData = async () => {
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
  };

  useEffect(() => {
    setTrails([]);
    setHasNext(true);
    lastIdRef.current = undefined;
    loadInitialData();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [type, bookmarkId]);

  useEffect(() => {
    if (initialLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasNext, loading, initialLoading]);

  const handleCardClick = (walkwayId: number) => {
    if (type === "favorites" || type === "bookmarks") {
      navigate(`/main/recommend/detail/${walkwayId}`);
    } else {
      navigate(`/mypage/myregister/${walkwayId}`);
    }
  };

  return (
    <>
      <AppBar onBack={() => navigate("/mypage")} title={title} />
      <Wrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!initialLoading && trails.length === 0 && !error && (
          <EmptyMessage>표시할 산책로가 없습니다.</EmptyMessage>
        )}
        <List>
          {trails.map((trail, index) => (
            <div
              key={trail.walkwayId}
              ref={index === trails.length - 1 ? lastElementRef : null}
            >
              <TrailCardAll
                trail={trail}
                onClick={() => handleCardClick(trail.walkwayId)}
              />
            </div>
          ))}
        </List>
        {loading && <LoadingSpinner />}
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

export default TrailListPage;
