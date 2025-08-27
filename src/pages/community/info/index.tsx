import BottomNavigation from "src/components/bottomNavigation";
import { MdLockOutline, MdMoreVert } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { getCrewDetail } from "src/apis/crew/crew";
import { CrewDetailInfo } from "src/apis/crew/crew.type";
import { useEffect, useState } from "react";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 126px);
  background-color: #fff;
  gap: 2rem;
`;
const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
// const FixedButtonWrapper = styled.div`
//   padding: 0 20px 20px;
//   background-color: #fff;
//   position: sticky;
//   bottom: 0;
//   z-index: 10;
// `;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.Gray500};
  margin: 1.5rem 0 1rem;
`;
// const SubmitButton = styled.button<{ disabled: boolean }>`
//   background-color: ${({ disabled, theme }) =>
//     disabled ? theme.Gray400 : theme.Green500};
//   color: ${theme.White};
//   width: 100%;
//   min-height: 52px;
//   border: none;
//   font-size: 16px;
//   font-weight: 500;
//   border-radius: 6px;
//   margin: 20px auto;
//   max-width: 800px;
//   cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
// `;
export default function CrewInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const crewId = location.state?.crewId;
  const [crew, setCrew] = useState<CrewDetailInfo | null>(null);

  useEffect(() => {
    const fetchCrew = async () => {
      if (!crewId) {
        return <div>크루 정보를 찾을 수 없습니다.</div>;
      }
      try {
        const data = await getCrewDetail(crewId);
        setCrew(data);
      } catch (e) {
        console.error("크루 정보 불러오기 실패", e);
      }
    };
    fetchCrew();
  }, [crewId]);

  const handleBack = () => navigate(-1);
  // const handleSubmit = () => {
  //   if (!crew.description || !crew.rules) return; // 예시
  //   // API 호출 or 다음 페이지 이동
  //   console.log("제출됨:", crew);
  // };

  return (
    <>
      <AppBar
        onBack={handleBack}
        title={
          crew?.visibility === "PRIVATE" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {crew.name} <MdLockOutline />
            </div>
          ) : (
            crew?.name
          )
        }
        rightIcon={<MdMoreVert size={20} />}
      />
      <PageWrapper>
        <ScrollContainer>
          <Container>
            <Title>👥 크루 소개</Title>
            <Content>{crew?.description}</Content>
          </Container>
          <Line></Line>
          <Container>
            <Title>📋 크루 규칙</Title>
            <Content>{crew?.rule}</Content>
          </Container>
        </ScrollContainer>
        {/* <FixedButtonWrapper>
          <SubmitButton
            disabled={!crew.description || !crew.rules}
            onClick={handleSubmit}
          >
            완료
          </SubmitButton>
        </FixedButtonWrapper> */}
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}