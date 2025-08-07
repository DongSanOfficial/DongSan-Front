import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MdAdd,
  MdSearch,
  MdLockOutline,
  MdClose,
} from "react-icons/md";
import { theme } from "src/styles/colors/theme";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";
import Divider from "src/components/divider/Divider";
import CrewCard from "./components/CrewCard";
import { getMyCrews, getRecommendedCrews, joinCrew } from "src/apis/crew/crew";
import { CrewData } from "src/apis/crew/crew.type";
import { useToast } from "src/context/toast/useToast";
import Modal from "src/components/modal";
import TextInput from "src/components/input";
import { truncateText } from "src/utils/truncateText";
import { useInfiniteScroll } from "src/hooks/useInfiniteScroll";

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
  variant?: "primary" | "secondary";
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
      : theme.Gray400};
  color: white;
`;

export default function Community() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [myCrews, setMyCrews] = useState<CrewData[]>([]);
  const [myCrewLoading, setMyCrewLoading] = useState(false);
  const [myCrewError, setMyCrewError] = useState<string | null>(null);
  const [myCrewHasNext, setMyCrewHasNext] = useState(true);
  const [myCrewLastId, setMyCrewLastId] = useState<number | null>(null);

  const [recommendedCrews, setRecommendedCrews] = useState<CrewData[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [recommendedError, setRecommendedError] = useState<string | null>(null);

  const [selectedCrew, setSelectedCrew] = useState<CrewData | null>(null);
  const [password, setPassword] = useState("");

  const handleBack = () => navigate(-1);
  const handleCreateCrew = () => navigate("/community/create");
  const handleSearch = () => navigate("/community/search");

  const fetchMyCrews = async () => {
    if (myCrewLoading || !myCrewHasNext) return;
    try {
      setMyCrewLoading(true);
      const response = await getMyCrews({ size: 10, lastId: myCrewLastId || undefined });
      setMyCrews((prev) => [...prev, ...response.data]);
      setMyCrewHasNext(response.hasNext);
      const newLastId = response.data[response.data.length - 1]?.crewId;
      if (newLastId) setMyCrewLastId(newLastId);
    } catch (err) {
      setMyCrewError(
        err instanceof Error ? err.message : "나의 크루 로드 실패"
      );
    } finally {
      setMyCrewLoading(false);
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

  const handleJoin = async () => {
    if (!selectedCrew) return;
    try {
      await joinCrew({
        crewId: selectedCrew.crewId,
        password: selectedCrew.visibility === "PRIVATE" ? password : null,
      });
      showToast("가입이 완료되었습니다.", "success");
      setSelectedCrew(null);
      setPassword("");
      fetchRecommendedCrews();
      setMyCrews([]);
      setMyCrewLastId(null);
      setMyCrewHasNext(true);
      fetchMyCrews();
    } catch (error: any) {
      showToast(error.message ?? "크루 가입에 실패했습니다.", "error");
    }
  };

  useEffect(() => {
    fetchMyCrews();
    fetchRecommendedCrews();
  }, []);

  const { lastElementRef } = useInfiniteScroll({
    hasNext: myCrewHasNext,
    loading: myCrewLoading,
    onLoadMore: fetchMyCrews,
  });

  const handleExplore = () => {
    if (!selectedCrew) return;
    if (!selectedCrew.isJoined && selectedCrew.visibility === "PRIVATE") {
      showToast("가입된 크루원만 볼 수 있습니다.", "error");
      return;
    }
    navigate("/community/detail", {
      state: {
        crewId: selectedCrew.crewId,
        name: selectedCrew.name,
        visibility: selectedCrew.visibility,
        isJoined: selectedCrew.isJoined,
      },
    });
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
        </SectionHeader>
              <CrewCardList>
        {myCrews.map((crew, idx) => {
          const isLast = idx === myCrews.length - 1;
          return (
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
                    isManager: crew.isManager,
                    isJoined: crew.isJoined,
                  },
                })
              }
              ref={isLast ? lastElementRef : undefined}
            />
          );
        })}
        {myCrewLoading && <LoadingText>불러오는 중...</LoadingText>}
        {myCrewError && <ErrorText>{myCrewError}</ErrorText>}
      </CrewCardList>

        <Divider />

        <SectionHeader>
          <SectionTitle>동산 추천 크루</SectionTitle>
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
                onClick={() => {
                  setSelectedCrew(crew);
                  setPassword("");
                }}
              />
            ))
          ) : (
            <LoadingText>추천 크루가 없습니다.</LoadingText>
          )}
        </CrewCardList>
        <BottomNavigation />
      </PageWrapper>

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
                <div style={{ flex: 1 }}>
                  <TextInput
                    value={password}
                    onChange={setPassword}
                    maxLength={20}
                    placeholder="비밀번호 입력"
                  />
                </div>
              </Row>
            </Field>
          )}

          <FooterButtons>
            <ActionButton variant="secondary" onClick={handleExplore}>
              둘러보기
            </ActionButton>
            <ActionButton
              variant="primary"
              disabled={
                selectedCrew.visibility === "PRIVATE" && password.length < 1
              }
              onClick={handleJoin}
            >
              가입하기
            </ActionButton>
          </FooterButtons>
        </Modal>
      )}
    </>
  );
}
