import { BiPlusCircle } from "react-icons/bi";
import RecruitList from "../components/RecruitList";
import styled from "styled-components";
import { useEffect, useState } from "react";
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
  const location = useLocation();
  const crewId = location.state?.crewId;
  const isJoined = location.state?.isJoined ?? false;
  const navigate = useNavigate();

  const handleCardClick = (cowalkId: number) => {
    navigate(`/community/detail/${cowalkId}`, { state: { crewId, cowalkId } });
  };

  const handleSubmit = async ({
    crewId,
    startDate,
    startTime,
    endDate,
    endTime,
    limitEnable,
    memberLimit,
    memo,
  }: RecruitCowalker & { crewId: number }) => {
    try {
      const { data: listdata } = await getCowalkList({ crewId });
      setRecruitList(listdata);
    } catch (e) {
      console.error("산책 리스트 갱신 실패", e);
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        if (!crewId) return;

        const [recruitRes, userCowalkRes] = await Promise.all([
          getCowalkList({ crewId }),
          getUserCowalkList(),
        ]);

        setRecruitList(recruitRes.data);
        setMyCowalkList(userCowalkRes.data);
        console.log("내가 신청한 산책 일정:", userCowalkRes.data);
      } catch (e) {
        console.error("산책 목록 조회 실패", e);
      }
    };

    fetchLists();
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecruitForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
