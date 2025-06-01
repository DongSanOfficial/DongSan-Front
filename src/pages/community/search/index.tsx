import { useState } from "react";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { useNavigate } from "react-router-dom";
import SearchBar from "src/pages/main/components/SearchInput";
import SearchCrewCard from "./components/SearchCrewCard";
import Modal from "src/components/modal";
import TextInput from "src/components/input";
import CheckButton from "src/components/button/CheckButton";
import { MdLockOutline, MdClose } from "react-icons/md";
import { truncateText } from "src/utils/truncateText";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 176px);
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const Info = styled.p`
  font-size: 14px;
  margin: 8px 0;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
`;

const Field = styled.div`
  margin-top: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 6px;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 24px;
`;

const ActionButton = styled.button<{
  variant?: "primary" | "secondary" | "secession";
  disabled?: boolean;
}>`
  flex: 1;
  padding: 10px 0;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ variant, disabled }) =>
    disabled
      ? theme.Gray300
      : variant === "primary"
      ? theme.Green500
      : variant === "secession"
      ? theme.Red300
      : theme.Gray400};
  color: white;
`;
const mockData = [
  {
    name: "크루 1",
    description:
      "매일 30분 이상 걷기! 함께 인증하고 응원하며 건강한 습관을 만들어가요. 목표는 작지만, 함께라면 꾸준히 할 수 있어요 💪 매일 30분 이상 걷기! 함께 인증하고 응원하며 건강한 습관을 만들어가요. 목표는 작지만, 함께라면 꾸준히 할 수 있어요 💪 ",
    visibility: "PRIVATE",
    limitEnable: true,
    memberCount: 10,
    memberLimit: 20,
    crewImageUrl:
      "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
    createdAt: "2025.01.01",
    isJoined: false,
  },
  {
    name: "크루 2",
    description:
      "크루원끼리 대화하며 운동도 하고, 근처에서 함께 산책할 친구도 찾아보세요! 자유롭게, 하지만 배려하는 분위기를 지켜요 🫶",
    visibility: "PUBLIC",
    limitEnable: true,
    memberCount: 1,
    memberLimit: 40,
    crewImageUrl:
      "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
    createdAt: "2025.04.01",
    isJoined: true,
  },
  {
    name: "크루 3",
    description:
      "크루원끼리 대화하며 운동도 하고, 근처에서 함께 산책할 친구도 찾아보세요! 자유롭게, 하지만 배려하는 분위기를 지켜요 🫶",
    visibility: "PUBLIC",
    limitEnable: false,
    memberCount: 100,
    memberLimit: 0,
    crewImageUrl:
      "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
    createdAt: "2025.03.15",
    isJoined: false,
  },
  {
    name: "크루 3",
    description:
      "크루원끼리 대화하며 운동도 하고, 근처에서 함께 산책할 친구도 찾아보세요! 자유롭게, 하지만 배려하는 분위기를 지켜요 🫶",
    visibility: "PRIVATE",
    limitEnable: false,
    memberCount: 100,
    memberLimit: 0,
    crewImageUrl:
      "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
    createdAt: "2025.03.15",
    isJoined: false,
  },
  {
    name: "크루 4",
    description:
      "자연을 느끼며 걷는 사람들 모여요. 오늘 걸은 길, 들은 새소리, 본 하늘을 공유하는 따뜻한 공간이에요.",
    visibility: "PUBLIC",
    limitEnable: false,
    memberCount: 100,
    memberLimit: 0,
    crewImageUrl:
      "https://cdn.theden.co.kr/news/photo/202412/3175_11900_4233.jpg",
    createdAt: "2025.03.15",
    isJoined: true,
  },
];

export default function SearchCrew() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [crews, setCrews] = useState(mockData);
  const [selectedCrew, setSelectedCrew] = useState<(typeof mockData)[0] | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleSearch = () => {
    setCrews(mockData.filter((c) => c.name.includes(search)));
  };

  const handleVerify = () => {
    // 인증 api
    if (password.length >= 8) setIsVerified(true);
  };

  const handleExplore = () => navigate("/community/detail");

  const handleJoin = () => {
    // 가입 api
    console.log("가입 요청", selectedCrew?.name);
  };

  const handleSecession = () => {
    // 탈퇴 api
    console.log("탈퇴 요청", selectedCrew?.name);
  };

  return (
    <div>
      <AppBar onBack={() => navigate(-1)} title="크루 검색" />
      <div style={{ padding: "0 20px" }}>
        <SearchBar
          placeholder="크루명을 검색하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
          leftIcon={false}
          inputStyle={{
            border: "1.5px solid black",
            borderRadius: "1rem",
          }}
        />
        <PageWrapper>
          {crews.map((crew, crewIndex) => (
            <SearchCrewCard
              key={crewIndex}
              {...crew}
              onClick={() => {
                setSelectedCrew(crew);
                setPassword("");
                setIsVerified(false);
              }}
            />
          ))}
        </PageWrapper>
      </div>

      <BottomNavigation />

      {selectedCrew && (
        <Modal isOpen={!!selectedCrew} onClose={() => setSelectedCrew(null)}>
          <ModalHeader>
            <Title>
              {selectedCrew.name}{" "}
              {selectedCrew.visibility === "PRIVATE" && <MdLockOutline />}
            </Title>
            <CloseButton onClick={() => setSelectedCrew(null)}>
              <MdClose />
            </CloseButton>
          </ModalHeader>

          <Info>
            인원 |{" "}
            {selectedCrew.limitEnable
              ? `${selectedCrew.memberCount} / ${selectedCrew.memberLimit}명`
              : "제한 없음"}
          </Info>
          <Info>시작일 | {selectedCrew.createdAt}</Info>
          <Description>
            소개글 | {truncateText(selectedCrew.description, 100)}
          </Description>
          {!selectedCrew.isJoined && selectedCrew.visibility === "PRIVATE" && (
            <Field>
              <label>가입 비밀번호</label>
              <Row>
                <div style={{ flex: 3 }}>
                  <TextInput
                    value={password}
                    onChange={setPassword}
                    maxLength={20}
                    placeholder="비밀번호 입력"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <CheckButton
                    active={password.length >= 8 && !isVerified}
                    label={isVerified ? "인증완료" : "인증요청"}
                    onClick={handleVerify}
                  />
                </div>
              </Row>
            </Field>
          )}

          <FooterButtons>
            {selectedCrew.isJoined ? (
              <>
                <ActionButton
                  variant="secondary"
                  onClick={() => setSelectedCrew(null)}
                >
                  취소
                </ActionButton>
                <ActionButton variant="secession" onClick={handleSecession}>
                  탈퇴하기
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton
                  variant="secondary"
                  disabled={
                    selectedCrew.visibility === "PRIVATE" && !isVerified
                  }
                  onClick={handleExplore}
                >
                  둘러보기
                </ActionButton>
                <ActionButton
                  variant="primary"
                  disabled={
                    selectedCrew.visibility === "PRIVATE" && !isVerified
                  }
                  onClick={handleJoin}
                >
                  가입하기
                </ActionButton>
              </>
            )}
          </FooterButtons>
        </Modal>
      )}
    </div>
  );
}
