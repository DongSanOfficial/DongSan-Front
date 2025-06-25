import { BiPlusCircle } from "react-icons/bi";
import RecruitList from "../components/RecruitList";
import styled from "styled-components";
import { useEffect, useState } from "react";
import RecruitForm from "../../components/RecruitForm";
import Modal from "src/components/modal";
import { useLocation, useNavigate } from "react-router-dom";
import { Cowalkwithcrew, RecruitCowalker } from "src/apis/crew/crew.type";
import { getCowalkList } from "src/apis/crew/crew";
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
  const location = useLocation();
  const crewId = location.state?.crewId;
  const navigate = useNavigate();
  const handleCardClick = (cowalkId: number) => {
    navigate(`/community/detail/${cowalkId}`, { state: { crewId, cowalkId } });
  };
  const handleSubmit = async ({
    date,
    time,
    limitEnable,
    memberLimit,
  }: RecruitCowalker) => {
    try {
      const { data: listdata } = await getCowalkList({ crewId });
      setRecruitList(listdata);
    } catch (e) {
      console.error("산책 리스트 갱신 실패", e);
    }

    setIsModalOpen(false); // 작성 후 모달 닫기
  };

  useEffect(() => {
    const fetchCowalkList = async () => {
      try {
        const { data: listdata } = await getCowalkList({ crewId });
        setRecruitList(listdata);
        console.log(listdata);
      } catch (e) {
        console.error("같이 산책 글 조회 실패", e);
      }
    };
    if (crewId) fetchCowalkList();
  }, [crewId]);

  return (
    <div>
      <Plusicon onClick={() => setIsModalOpen(true)}>
        <BiPlusCircle fontSize="32px" />
      </Plusicon>
      <Title>내가 신청한 산책 일정 목록</Title>

      <MyCowalkList />
      <Line />
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
