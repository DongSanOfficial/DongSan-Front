import BottomNavigation from "src/components/bottomNavigation";
import { MdArrowForwardIos, MdLockOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

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
  justify-content: space-between;
`;

export default function CrewInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const crew = location.state?.crew;

  if (!crew) {
    return <div>크루 정보를 찾을 수 없습니다.</div>;
  }

  const handleBack = () => navigate(-1);
  return (
    <>
      <AppBar
        onBack={handleBack}
        title={
          crew.visibility === "PRIVATE" ? (
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
            crew.name
          )
        }
        //rightIcon={<MdMoreVert size={20} />}
      />
      <PageWrapper>
        <ScrollContainer></ScrollContainer>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
