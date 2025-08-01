import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { MdMoreVert, MdLockOutline } from "react-icons/md";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import Together from "./together";
import Feed from "./feed";
import Summary from "./summary";
import { useToast } from "src/context/toast/useToast";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 126px);
  background-color: #fff;
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.Gray200};
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 0;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background-color: transparent;
  border-bottom: 3px solid
    ${({ active, theme }) => (active ? theme.Green500 : "transparent")};
  color: ${({ active, theme }) => (active ? theme.Black : theme.Gray500)};
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px 20px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.Red500};
`;

const TabList = ["요약", "피드", "같이 산책"];

export default function CrewDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const initialActiveTab = location.state?.activeTab ?? "요약";
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  const crewId = location.state?.crewId;
  const isManager = location.state?.isManager;
  const crewName = location.state?.name;
  const visibility = location.state?.visibility;

  const handleBack = () => navigate(-1);
  const handleRightClick = () => {
    navigate("/community/detail/crewSetting", { state: { crewId, isManager } });
  };

  const handleTabClick = (tab: string) => {
    const isRestricted = tab === "피드" || tab === "같이 산책";
    if (isRestricted && isJoined === false) {
      showToast("크루에 가입해야 볼 수 있습니다. ", "error");
      return;
    }
    setActiveTab(tab);
  };

  const renderHeader = () => (
    <AppBar
      onBack={handleBack}
      title={
        visibility === "PRIVATE" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {crewName} <MdLockOutline />
          </div>
        ) : (
          crewName
        )
      }
      rightIcon={<MdMoreVert size={20} />}
      onRightClick={handleRightClick}
    />
  );

  if (!crewId) {
    return (
      <>
        {renderHeader()}
        <PageWrapper>
          <ErrorContainer>크루 ID가 없습니다.</ErrorContainer>
        </PageWrapper>
      </>
    );
  }

  return (
    <>
      {renderHeader()}
      <PageWrapper>
        <TabHeader>
          {TabList.map((tab) => {
            return (
              <TabButton
                key={tab}
                active={activeTab === tab}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </TabButton>
            );
          })}
        </TabHeader>
        <ScrollContainer>
          {activeTab === "요약" && (
            <Summary crewId={crewId} onIsJoined={setIsJoined} />
          )}
          {activeTab === "피드" && <Feed crewId={crewId} />}
          {activeTab === "같이 산책" && <Together />}
        </ScrollContainer>
        <BottomNavigation />
      </PageWrapper>
    </>
  );
}
