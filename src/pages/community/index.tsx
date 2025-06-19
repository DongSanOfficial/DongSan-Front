import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdAdd, MdSearch, MdChevronRight } from "react-icons/md";
import { theme } from "src/styles/colors/theme";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import Divider from "src/components/divider/Divider";
import CrewCard from "./components/CrewCard";
import { getMyCrews, getRecommendedCrews } from "src/apis/crew/crew";
import { CrewData } from "src/apis/crew/crew.type";

const PageWrapper = styled.div`
  display: flex;
  padding: 0px 20px 20px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
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

export default function Community() {
  const navigate = useNavigate();
  // 나의 크루
  const [myCrews, setMyCrews] = useState<CrewData[]>([]);
  const [myCrewLoading, setmyCrewLoading] = useState(true);
  const [myCrewError, setmyCrewError] = useState<string | null>(null);
  // 추천 크루
  const [recommendedCrews, setRecommendedCrews] = useState<CrewData[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [recommendedError, setRecommendedError] = useState<string | null>(null);

  const handleBack = () => navigate(-1);
  const handleCreateCrew = () => navigate("/community/create");
  const handleSearch = () => navigate("/community/search");

  useEffect(() => {
    const fetchMyCrews = async () => {
      try {
        setmyCrewLoading(true);
        setmyCrewError(null);
        const response = await getMyCrews({ size: 10 });
        setMyCrews(response.data);
      } catch (err) {
        setmyCrewError(err instanceof Error ? err.message : "나의 크루 로드 실패");
      } finally {
        setmyCrewLoading(false);
      }
    };

    const fetchRecommendedCrews = async () => {
      try {
        setRecommendedLoading(true);
        setRecommendedError(null);
        const response = await getRecommendedCrews({ size: 10 });
        setRecommendedCrews(response.data);
      } catch (err) {
        setRecommendedError(
          err instanceof Error ? err.message : "추천 크루 로드 실패"
        );
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchMyCrews();
    fetchRecommendedCrews();
  }, []);

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
          <IconButton
            onClick={() =>
              navigate("/community/all", { state: { type: "my" } })
            }
          >
            <MdChevronRight size={20} />
          </IconButton>
        </SectionHeader>
        <CrewCardList>
          {myCrewLoading ? (
            <LoadingText>나의 크루 불러오는 중...</LoadingText>
          ) : myCrewError ? (
            <ErrorText>{myCrewError}</ErrorText>
          ) : myCrews.length > 0 ? (
            myCrews.slice(0, 5).map((crew) => (
              <CrewCard
                key={crew.crewId}
                crewName={crew.name}
                crewImageUrl={crew.crewImageUrl}
                variant="myCrew"
                isManager={crew.isManager}
                onClick={() =>
                  navigate("/community/detail", {
                    state: {
                      crewId: crew.crewId,
                      name: crew.name,
                      visibility: crew.visibility,
                    },
                  })
                }
              />
            ))
          ) : (
            <LoadingText>가입된 크루가 없습니다.</LoadingText>
          )}
        </CrewCardList>

        <Divider />

        <SectionHeader>
          <SectionTitle>동산 추천 크루</SectionTitle>
          <IconButton
            onClick={() =>
              navigate("/community/all", { state: { type: "recommended" } })
            }
          >
            <MdChevronRight size={20} />
          </IconButton>
        </SectionHeader>
        <CrewCardList>
          {recommendedLoading ? (
            <LoadingText>추천 크루 불러오는 중...</LoadingText>
          ) : recommendedError ? (
            <ErrorText>{recommendedError}</ErrorText>
          ) : recommendedCrews.length > 0 ? (
            recommendedCrews.slice(0, 5).map((crew) => (
              <CrewCard
                key={crew.crewId}
                crewName={crew.name}
                crewImageUrl={crew.crewImageUrl}
                variant="recommended"
                memberCount={crew.memberCount}
                onClick={() =>
                  navigate("/community/detail", {
                    state: {
                      crewId: crew.crewId,
                      name: crew.name,
                      visibility: crew.visibility,
                    },
                  })
                }
              />
            ))
          ) : (
            <LoadingText>추천 크루가 없습니다.</LoadingText>
          )}
        </CrewCardList>
        <BottomNavigation />
      </PageWrapper>
    </>
  );
}
