import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { getCrewDetail, getCrewRanking, leaveCrew } from "src/apis/crew/crew";
import { CrewDetailInfo, CrewRankingItem } from "src/apis/crew/crew.type";
import WeeklyInfo from "../components/WeeklyInfo";
import Divider from "src/components/divider/Divider";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RankItem from "../components/RankItem";
import ConfirmationModal from "src/components/modal/ConfirmationModal";
import { theme } from "src/styles/colors/theme";
import DefaultImage from "src/assets/images/profile.png";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
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

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: ${theme.Gray500};
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 20px;
  color: ${theme.Red300};
`;

export default function Summary({
  crewId,
  onIsJoined,
}: {
  crewId: number;
  onIsJoined?: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crewDetail, setCrewDetail] = useState<CrewDetailInfo | null>(null);
  const [ranks, setRanks] = useState<CrewRankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [detailRes, rankRes] = await Promise.all([
          getCrewDetail(crewId),
          getCrewRanking(crewId, {
            period: "daily",
            date: today,
            sort: "distance",
          }),
        ]);
        setCrewDetail(detailRes);
        setRanks(rankRes.data);
        onIsJoined?.(detailRes.isJoined);
      } catch (err) {
        setError("크루 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [crewId, today, onIsJoined]);

  const handleRankDetail = () => {
    if (!crewDetail) return;
    navigate("/community/detail/summary/rank", {
      state: { crewId },
    });
  };

  const handleDelete = async () => {
    try {
      await leaveCrew(crewId);
      setIsModalOpen(false);
      navigate(-1);
    } catch (err) {
      console.error("탈퇴 실패", err);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingText>로딩 중...</LoadingText>
      </PageWrapper>
    );
  }

  if (error || !crewDetail) {
    return (
      <PageWrapper>
        <ErrorText>{error || "크루 정보를 불러올 수 없습니다."}</ErrorText>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Title>소개</Title>
      <CrewInfo>
        <CrewImage src={crewDetail.crewImageUrl ?? DefaultImage} alt="crew" />
        <Description>{crewDetail.description}</Description>
      </CrewInfo>
      <Divider margin="2rem 0" />
      <Title>주간 정보</Title>
      <WeeklyInfo
        crewSize={crewDetail.memberCount}
        distance={crewDetail.weeklyStats.distanceKm}
        time={crewDetail.weeklyStats.durationHour}
      />
      <Divider margin="2rem 0" />
      <SectionHeader>
        <SectionTitle>랭킹</SectionTitle>
        <IconButton onClick={handleRankDetail}>
          <MdChevronRight size={20} />
        </IconButton>
      </SectionHeader>
      {ranks.map((rank, i) => (
        <RankItem
          key={rank.memberId}
          rank={i + 1}
          name={rank.nickname}
          distance={rank.distanceKm}
        />
      ))}

      {crewDetail.isJoined && (
        <WithdrawButton onClick={() => setIsModalOpen(true)}>
          탈퇴하기
        </WithdrawButton>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="정말로 크루에서 나가시겠습니까?"
        cancelText="취소"
        confirmText="나가기"
        modalType="crewSecession"
      />
    </PageWrapper>
  );
}