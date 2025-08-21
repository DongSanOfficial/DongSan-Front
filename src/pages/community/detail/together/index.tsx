import { BiPlusCircle } from "react-icons/bi";
import RecruitList from "../components/RecruitList";
import styled from "styled-components";
import { useEffect, useRef, useState, useCallback } from "react";
import RecruitForm from "../../components/RecruitForm";
import Modal from "src/components/modal";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Cowalkwithcrew,
  RecruitCowalker,
  UserCowalk,
} from "src/apis/crew/crew.type";
import { getCowalkList, getUserCowalkList } from "src/apis/crew/crew";
import MyCowalkList from "../components/MyCowalkList";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

const Plusicon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin: 0.5rem 0.2rem;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0;
`;

export default function Together() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recruitList, setRecruitList] = useState<Cowalkwithcrew[]>([]);
  const [myCowalkList, setMyCowalkList] = useState<UserCowalk[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const crewId = location.state?.crewId;
  const isJoined = location.state?.isJoined ?? false;
  const navigate = useNavigate();

  const handleCardClick = (cowalkId: number) => {
    navigate(`/community/detail/${cowalkId}`, {
      state: {
        crewId,
        cowalkId,
        fromTab: "같이 산책",
        prevState: location.state,
      },
    });
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !crewId) return;

    setLoading(true);
    try {
      const lastId =
        recruitList.length > 0
          ? recruitList[recruitList.length - 1]?.cowalkId
          : undefined;
      const { data: newList } = await getCowalkList({
        crewId,
        lastId,
        size: 5,
      });

      if (newList.length === 0) {
        setHasMore(false);
      } else {
        setRecruitList((prev) => [...prev, ...newList]);
        setHasMore(newList.length === 5);
      }
    } catch (e) {
      console.error("무한스크롤 데이터 로딩 실패", e);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, crewId, recruitList]);

  const handleSubmit = async ({
    crewId,
    startDate,
    startTime,
    endTime,
    limitEnable,
    memberLimit,
    memo,
  }: RecruitCowalker & { crewId: number }) => {
    try {
      // 새 글 등록 후 첫 페이지부터 다시 로드
      const { data: listdata } = await getCowalkList({
        crewId,
        lastId: undefined,
        size: 5,
      });
      setRecruitList(listdata);
      setHasMore(listdata.length === 5);

      const { data: userCowalkData } = await getUserCowalkList();
      setMyCowalkList(userCowalkData);
    } catch (e) {
      console.error("산책 리스트 갱신 실패", e);
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [loadMore, loading, hasMore]);

  useEffect(() => {
    const fetchInitial = async () => {
      if (!crewId) return;

      setLoading(true);
      try {
        const [recruitRes, userCowalkRes] = await Promise.all([
          getCowalkList({ crewId, size: 5 }),
          getUserCowalkList(),
        ]);

        setRecruitList(recruitRes.data);
        setMyCowalkList(userCowalkRes.data);
        setHasMore(recruitRes.data.length === 5);
      } catch (e) {
        console.error("초기 산책 목록 조회 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, [crewId]);

  return (
    <div>
      {isJoined && (
        <>
          <Plusicon onClick={() => setIsModalOpen(true)}>
            <BiPlusCircle fontSize="32px" />
          </Plusicon>

          <Title>내가 신청한 산책 일정 목록</Title>
          {myCowalkList.length === 0 ? (
            <div style={{ padding: "0.5rem 1rem", color: "#999" }}>
              신청한 산책 일정이 없습니다.
            </div>
          ) : (
            myCowalkList.map(({ cowalkId, startedAt, endedAt }) => (
              <MyCowalkList
                key={cowalkId}
                startedAt={startedAt}
                endedAt={endedAt}
                cowalkId={cowalkId}
              />
            ))
          )}

          <Line />
        </>
      )}

      <Title>최근 올라온 같이산책 일정</Title>
      {recruitList.map((item) => (
        <RecruitList
          key={item.cowalkId}
          item={item}
          onClick={handleCardClick}
        />
      ))}

      {loading && <LoadingSpinner />}

      <div ref={observerRef} style={{ height: "1px" }} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecruitForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
