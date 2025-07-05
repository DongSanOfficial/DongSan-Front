import BottomNavigation from "src/components/bottomNavigation";
import { MdArrowForwardIos, MdLockOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { useEffect, useState } from "react";
import { getCrewDetail } from "src/apis/crew/crew";
import { CrewDetailInfo } from "src/apis/crew/crew.type";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 126px);
  background-color: #fff;
`;
const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
`;
const ItemContainer = styled.div`
  border-bottom: 1px solid ${theme.Gray500};
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 16px;
`;
const Item = styled.div``;
export default function CrewSetting() {
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
  const handleClick = () => {
    navigate("/community/detail/information", {
      state: { crewId },
    });
  };
  const handlemodify = () => {
    navigate("/community/modify", {
      state: { crewId },
    });
  };
  const handleBack = () => navigate(-1);
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
              {crew?.name} <MdLockOutline />
            </div>
          ) : (
            crew?.name
          )
        }
        //rightIcon={<MdMoreVert size={20} />}
      />
      <PageWrapper>
        <ScrollContainer>
          <ItemContainer>
            <Title>크루 소개/규칙</Title>
            <MdArrowForwardIos onClick={handleClick} />
          </ItemContainer>
          <ItemContainer>
            <Title>크루장</Title>
            <Item>{crew?.managerNickname}</Item>
          </ItemContainer>
          <ItemContainer>
            <Title>크루 인원</Title>
            <Item>
              {crew?.memberLimit
                ? `${crew?.memberCount}/${crew?.memberLimit}`
                : "제한 없음"}
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Title>크루 정보 수정</Title>
            <MdArrowForwardIos onClick={handlemodify} />
          </ItemContainer>
        </ScrollContainer>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
