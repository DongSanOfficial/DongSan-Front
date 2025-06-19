import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyCrews, getRecommendedCrews } from "src/apis/crew/crew";
import { CrewData } from "src/apis/crew/crew.type";
import AppBar from "src/components/appBar";
import CrewCard from "./components/CrewCard";
import { theme } from "src/styles/colors/theme";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
  height: calc(100dvh - 56px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 15px 30px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    padding: 20px 40px;
    max-width: 1024px;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0;
  color: ${theme.Black};
`;

const CrewCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function ViewAllCrewsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state?.type || "my";

  const [crews, setCrews] = useState<CrewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        setLoading(true);
        const response =
          type === "recommended"
            ? await getRecommendedCrews({ size: 100 })
            : await getMyCrews({ size: 100 });
        setCrews(response.data);
      } catch (error) {
        console.error("크루 목록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrews();
  }, [type]);

  return (
    <>
      <AppBar
        title={
          type === "recommended" ? "추천 크루 전체보기" : "나의 크루 전체보기"
        }
        onBack={() => navigate(-1)}
      />
      <PageWrapper>
        <Title>{type === "recommended" ? "추천 크루" : "나의 크루"}</Title>
        <CrewCardList>
          {loading ? (
            <div>로딩 중...</div>
          ) : crews.length > 0 ? (
            crews.map((crew) => (
              <CrewCard
                key={crew.crewId}
                crewName={crew.name}
                crewImageUrl={crew.crewImageUrl}
                variant={type === "recommended" ? "recommended" : "myCrew"}
                memberCount={crew.memberCount}
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
            <div>크루가 없습니다.</div>
          )}
        </CrewCardList>
      </PageWrapper>
    </>
  );
}
