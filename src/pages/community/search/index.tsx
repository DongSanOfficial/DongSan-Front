import { useEffect, useState } from "react";
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
import { getSearchCrews } from "src/apis/crew/crew";
import { CrewData } from "src/apis/crew/crew.type";

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

export default function SearchCrew() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [crews, setCrews] = useState<CrewData[]>([]);
  const [selectedCrew, setSelectedCrew] = useState<CrewData | null>(null);
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const fetchCrews = async (keyword: string) => {
    try {
      const trimmed = keyword.trim();
      const response = await getSearchCrews({ name: trimmed });
      setCrews(response.data);
    } catch (error) {
      console.error("크루 검색 실패:", error);
    }
  };

  useEffect(() => {
    fetchCrews("");
  }, []);

  const handleSearch = () => {
    fetchCrews(search);
  };

  const handleVerify = () => {
    if (password.length >= 8) setIsVerified(true);
  };

  const handleExplore = () => {
    if (!selectedCrew) return;
    navigate("/community/detail", {
      state: {
        crewId: selectedCrew.crewId,
        name: selectedCrew.name,
        visibility: selectedCrew.visibility,
      },
    });
  };

  const handleJoin = () => {
    console.log("가입 요청", selectedCrew?.name);
  };

  const handleSecession = () => {
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
          {crews.map((crew) => (
            <SearchCrewCard
              key={crew.crewId}
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
        <Modal isOpen onClose={() => setSelectedCrew(null)}>
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
