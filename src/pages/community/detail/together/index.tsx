import { BiPlusCircle } from "react-icons/bi";
import RecruitList from "../components/RecruitList";
import styled from "styled-components";
import { useState } from "react";
import FormModal from "src/components/modal/FormModal";
import RecruitForm from "../../components/RecruitForm";

const Plusicon = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem;
`;
export default function Together() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = (title: string, content: string) => {
    console.log("제출된 제목:", title);
    console.log("제출된 내용:", content);
    setIsModalOpen(false); // 작성 후 모달 닫기
  };
  return (
    <div>
      <Plusicon onClick={() => setIsModalOpen(true)}>
        <BiPlusCircle fontSize="32px" />
      </Plusicon>
      <RecruitList />
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecruitForm onSubmit={handleSubmit} />
      </FormModal>
    </div>
  );
}
