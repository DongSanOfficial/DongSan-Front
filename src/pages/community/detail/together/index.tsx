import { BiPlusCircle } from "react-icons/bi";
import RecruitList from "../components/RecruitList";
import styled from "styled-components";
import { useState } from "react";
import RecruitForm from "../../components/RecruitForm";
import Modal from "src/components/modal";
import { useNavigate } from "react-router-dom";

const Plusicon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem;
`;

interface RecruitItem {
  id: number;
  cowalkId: number;
  date: string;
  time: string;
  peopleCount: number;
  maxCount: number;
  content: string;
}

export default function Together() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recruitList, setRecruitList] = useState<RecruitItem[]>([
    {
      id: 1,
      cowalkId: 1,
      date: "2025-06-03",
      time: "18:30",
      peopleCount: 3,
      maxCount: 5,
      content: "퇴근 후 같이 가볍게 산책하실 분 구해요!",
    },
    {
      id: 2,
      cowalkId: 2,
      date: "2025-06-03",
      time: "18:30",
      peopleCount: 3,
      maxCount: 5,
      content: "퇴근 후 같이 가볍게 산책하실 분 구해요!",
    },
  ]);
  const navigate = useNavigate();
  const handleCardClick = (cowalkId: number) => {
    navigate(`/community/detail/${cowalkId}`);
  };
  const handleSubmit = (title: string, content: string) => {
    console.log("제출된 제목:", title);
    console.log("제출된 내용:", content);
    //setRecruitList((prev) => [...prev, newRecruit]);
    setIsModalOpen(false); // 작성 후 모달 닫기
  };
  return (
    <div>
      <Plusicon onClick={() => setIsModalOpen(true)}>
        <BiPlusCircle fontSize="32px" />
      </Plusicon>
      {recruitList.map((item) => (
        <RecruitList key={item.id} item={item} onClick={handleCardClick} />
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecruitForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}
