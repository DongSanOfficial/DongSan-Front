import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdAdd, MdSearch, MdChevronRight } from "react-icons/md";
import { theme } from "src/styles/colors/theme";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import Divider from "src/components/Divider";
import CrewCard from "./components/CrewCard";

const PageWrapper = styled.div`
  display: flex;
  padding: 0px 20px 20px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 700px) {
    padding: 15px 30px;
  }

  @media screen and (min-width: 1024px) {
    padding: 20px 40px;
    max-width: 1024px;
    margin: 0 auto;
  }
`;

const CrewCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.Black};
`;

const RightIconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default function Community() {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleCreateCrew = () => navigate("/community/create");
  const handleSearch = () => navigate("/community/search");
  const handleMyCrewMore = () => navigate("/community/all");
  const handleRecommendedCrewMore = () => navigate("/community/all");

  const myCrewData = {
    data: [
      {
        name: "러닝메이트",
        description: "매주 수요일 아침 7시, 한강에서 러닝해요!",
        rule: "지각 금지, 주 1회 참석 필수",
        visibility: "PRIVATE",
        limitEnable: true,
        memberLimit: 15,
        memberCount: 12,
        crewImageUrl:
          "https://flexible.img.hani.co.kr/flexible/normal/970/581/imgdb/child/2025/0105/53_17360365895023_20250103502752.jpg",
        createdAt: "2024-06-01",
        isManager: false,
      },
      {
        name: "책맥크루 📚🍻",
        description: "책 한 권 읽고, 맥주 한 잔 하며 토론하는 모임!",
        rule: "비매너 금지, 늦지 않기",
        visibility: "PUBLIC",
        limitEnable: false,
        memberLimit: 0,
        memberCount: 0,
        crewImageUrl: "https://img.hankyung.com/photo/202411/99.37019337.1.jpg",
        createdAt: "2023-11-15",
        isManager: true,
      },
      {
        name: "책맥크루 📚🍻",
        description: "책 한 권 읽고, 맥주 한 잔 하며 토론하는 모임!",
        rule: "비매너 금지, 늦지 않기",
        visibility: "PUBLIC",
        limitEnable: false,
        memberLimit: 0,
        memberCount: 0,
        crewImageUrl: "https://img.hankyung.com/photo/202411/99.37019337.1.jpg",
        createdAt: "2023-11-15",
        isManager: true,
      },
      {
        name: "책맥크루 📚🍻",
        description: "책 한 권 읽고, 맥주 한 잔 하며 토론하는 모임!",
        rule: "비매너 금지, 늦지 않기",
        visibility: "PUBLIC",
        limitEnable: false,
        memberLimit: 0,
        memberCount: 0,
        crewImageUrl: "https://img.hankyung.com/photo/202411/99.37019337.1.jpg",
        createdAt: "2023-11-15",
        isManager: true,
      },
      {
        name: "책맥크루 📚🍻",
        description: "책 한 권 읽고, 맥주 한 잔 하며 토론하는 모임!",
        rule: "비매너 금지, 늦지 않기",
        visibility: "PUBLIC",
        limitEnable: false,
        memberLimit: 0,
        memberCount: 0,
        crewImageUrl: "https://img.hankyung.com/photo/202411/99.37019337.1.jpg",
        createdAt: "2023-11-15",
        isManager: true,
      },
    ],
    hasNext: false,
  };
  const recommendedCrewData = {
    data: [
      {
        name: "브런치 산책 크루",
        description: "주말 오전, 산책 후 브런치 함께해요",
        rule: "주 2회 이상 참여, 인증 필수",
        visibility: "PUBLIC",
        limitEnable: true,
        memberLimit: 10,
        memberCount: 8,
        crewImageUrl:
          "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
        createdAt: "2024-04-12",
        isJoined: false,
      },
      {
        name: "브런치 산책 크루",
        description: "주말 오전, 산책 후 브런치 함께해요",
        rule: "주 2회 이상 참여, 인증 필수",
        visibility: "PUBLIC",
        limitEnable: true,
        memberLimit: 10,
        memberCount: 8,
        crewImageUrl:
          "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
        createdAt: "2024-04-12",
        isJoined: false,
      },
      {
        name: "브런치 산책 크루",
        description: "주말 오전, 산책 후 브런치 함께해요",
        rule: "주 2회 이상 참여, 인증 필수",
        visibility: "PUBLIC",
        limitEnable: true,
        memberLimit: 10,
        memberCount: 8,
        crewImageUrl:
          "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
        createdAt: "2024-04-12",
        isJoined: false,
      },
      {
        name: "영화보고 수다떨기 🎬",
        description: "매주 금요일 밤 온라인 영화모임",
        rule: "노 스포일러, 자유롭게 참여",
        visibility: "PUBLIC",
        limitEnable: true,
        memberLimit: 20,
        memberCount: 19,
        crewImageUrl:
          "https://d2phebdq64jyfk.cloudfront.net/media/uploads/2024/10/21/3-241022__2.png",
        createdAt: "2023-09-01",
        isJoined: false,
      },
    ],
    hasNext: false,
  };

  return (
    <>
      <AppBar
        onBack={handleBack}
        title="커뮤니티"
        rightIcon={
          <RightIconGroup>
            <IconButton onClick={handleCreateCrew}>
              <MdAdd size={24} />
            </IconButton>
            <IconButton onClick={handleSearch}>
              <MdSearch size={24} />
            </IconButton>
          </RightIconGroup>
        }
      />
      <PageWrapper>
        <SectionHeader>
          <SectionTitle>나의 크루</SectionTitle>
          <IconButton onClick={handleMyCrewMore}>
            <MdChevronRight size={20} />
          </IconButton>
        </SectionHeader>
        <CrewCardList>
          {myCrewData.data.map((crew, idx) => (
            <CrewCard
              key={idx}
              crewName={crew.name}
              crewImage={crew.crewImageUrl}
              variant="myCrew"
              isManager={crew.isManager}
            />
          ))}
        </CrewCardList>
        <Divider />
        <SectionHeader>
          <SectionTitle>동산 추천 크루</SectionTitle>
          <IconButton onClick={handleRecommendedCrewMore}>
            <MdChevronRight size={20} />
          </IconButton>
        </SectionHeader>
        <CrewCardList>
          {recommendedCrewData.data.map((crew, idx) => (
            <CrewCard
              key={idx}
              crewName={crew.name}
              crewImage={crew.crewImageUrl}
              variant="recommended"
              memberCount={crew.memberCount}
            />
          ))}
        </CrewCardList>
        <BottomNavigation />
      </PageWrapper>
    </>
  );
}
