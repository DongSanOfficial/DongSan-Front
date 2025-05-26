import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdMoreVert } from "react-icons/md";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import { useState } from "react";
import Together from "./together";
import Feed from "./feed";
import Summary from "./summary";

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

const TabList = ["요약", "피드", "같이 산책"];

export default function CrewDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("요약");

  const crew = location.state?.crew;

  if (!crew) {
    return <div>크루 정보를 찾을 수 없습니다.</div>;
  }

  const handleBack = () => navigate(-1);

  return (
    <>
      <AppBar
        onBack={handleBack}
        title={crew.visibility === "PRIVATE" ? `${crew.name} 🔒` : crew.name}
        rightIcon={<MdMoreVert size={20} />}
      />
      <PageWrapper>
        <TabHeader>
          {TabList.map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </TabHeader>
        <ScrollContainer>
          {activeTab === "요약" && (
            <Summary
              name={crew.name}
              description={crew.description}
              crewImageUrl={crew.crewImageUrl}
              visibility={crew.visibility}
              memberCount={crew.memberCount}
            />
          )}
          {activeTab === "피드" && <Feed />}
          {activeTab === "같이 산책" && <Together />}
        </ScrollContainer>
        <BottomNavigation />
      </PageWrapper>
    </>
  );
}
