import styled from "styled-components";
import WeeklyInfo from "../components/WeeklyInfo";
import RankingList from "../components/RankList";
import { theme } from "src/styles/colors/theme";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import { useState } from "react";
import Divider from "src/components/divider/Divider";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.Black};
  margin-bottom: 10px;
`;

const CrewInfo = styled.div`
  display: flex;
  gap: 12px;
`;

const CrewImage = styled.img`
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.Gray100};
`;

const Description = styled.div`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.Gray800};
  line-height: 1.5;
  white-space: pre-wrap;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.Black};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const WithdrawButton = styled.button`
  font-size: 9px;
  color: ${({ theme }) => theme.Gray500};
  background: none;
  border: none;
  cursor: pointer;
  align-self: center;
  margin-top: auto;
  text-decoration: underline;
`;

interface CrewIntroProps {
  name: string;
  description: string;
  crewImageUrl: string;
  visibility: string;
  memberCount: number;
}

export default function Summary({
  name,
  crewImageUrl,
  visibility,
  description,
  memberCount,
}: CrewIntroProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const info = { crewSize: memberCount, distance: 25, time: 7 };
  const ranks = [
    { name: "김건우", distance: 5 },
    { name: "노성원", distance: 4 },
    { name: "이다은", distance: 2 },
    { name: "조유리", distance: 0.6 },
  ];

  const handleRankDetail = () => navigate("/community/detail/summary/rank");
  const handleOpenMoal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteAccount = async () => {
    console.log("크루 탈퇴");
  };

  return (
    <PageWrapper>
      <Content>
        <Title>소개</Title>
        <CrewInfo>
          <CrewImage src={crewImageUrl} alt="crew" />
          <Description>{description}</Description>
        </CrewInfo>
        <Divider margin="2rem 0" />
        <Title>주간 정보</Title>
        <WeeklyInfo
          crewSize={info.crewSize}
          distance={info.distance}
          time={info.time}
        />
        <Divider margin="2rem 0" />

        <SectionHeader>
          <SectionTitle>랭킹</SectionTitle>
          <IconButton onClick={handleRankDetail}>
            <MdChevronRight size={20} />
          </IconButton>
        </SectionHeader>
        <RankingList rankItems={ranks} />
      </Content>

      {/* isJoined가 false인 경우는 안보이게 처리해야 함 */}
      <WithdrawButton onClick={handleOpenMoal}>탈퇴하기</WithdrawButton>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteAccount}
        message={"정말로 크루에서 나가시겠습니까?"}
        cancelText="취소"
        confirmText="나가기"
        modalType="crewSecession"
      />
    </PageWrapper>
  );
}
