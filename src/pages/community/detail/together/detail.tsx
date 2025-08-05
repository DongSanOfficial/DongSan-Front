import BottomNavigation from "src/components/bottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import profileImg from "src/assets/images/profile.png";
import CheckButton from "src/components/button/CheckButton";
import CommentBtn from "../components/CommentBtn";
import CommentItem from "../components/CommentItem";
import RecruitItem from "../components/RecruitItem";
import {
  createCowalkComment,
  getCowalkCommentList,
  getCowalkDetailList,
  joinCowalk,
} from "src/apis/crew/crew";
import { useEffect, useState } from "react";
import { CowalkComment, Cowalkwithcrew } from "src/apis/crew/crew.type";
import { useToast } from "src/context/toast/useToast";
import dayjs from "dayjs";

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

const BottomScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
`;

const Bulletin = styled.div`
  width: 100%;
  max-height: 55%;
  border-bottom: 1px solid ${theme.Gray500};
  margin-bottom: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 4px solid ${theme.White};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  margin-left: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const Date = styled.div``;

const DetailContainer = styled.div``;

const Content = styled.div`
  max-height: 100px;
  height: auto;
  overflow-y: auto;
  padding: 1rem;
  font-size: 18px;
  font-weight: 700;
`;

const JoinContent = styled.div`
  border: 1px solid ${theme.Green500};
  width: 100%;
  height: 6rem;
  margin: 1rem 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  box-shadow: 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 1.5rem 0;
`;

const HalfButton = styled.div`
  width: 40%;
`;

export default function DetailFeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [recruitList, setRecruitList] = useState<Cowalkwithcrew>();
  const [commentList, setCommentList] = useState<CowalkComment[]>([]);
  const crewId = location.state?.crewId;
  const cowalkId = location.state?.cowalkId;
  const fromTab = location.state?.fromTab; // "같이 산책" 이면 탭 복원하기 위해서
  const prevState = location.state?.prevState;

  const datePart = recruitList?.createdDate?.split(" ")[0]; // ex: "2025-08-05"
  const endTimePart = recruitList?.endTime; // ex: "12:50:00"

  const fullEndDateTime = dayjs(`${datePart} ${endTimePart}`);
  // 뒤로가기 시 CrewDetailPage를 "같이 산책" 탭이 열린 상태로 열기
  const handleBack = () => {
    if (fromTab === "같이 산책" && crewId) {
      navigate("/community/detail", {
        replace: true,
        state: {
          ...prevState,
          crewId,
          activeTab: "같이 산책",
        },
      });
      return;
    }
    navigate(-1);
  };

  const clickJoin = async () => {
    try {
      await joinCowalk({ crewId, cowalkId });
      showToast("참여 신청되었습니다.", "success");
    } catch (error: any) {
      console.error("참여 실패", error);
      showToast(
        error.message ?? "참여에 실패했어요. 다시 시도해주세요.",
        "error"
      );
    }
  };

  useEffect(() => {
    const fetchCowalkList = async () => {
      try {
        const [recruitRes, commentRes] = await Promise.all([
          getCowalkDetailList({ crewId, cowalkId }),
          getCowalkCommentList({ crewId, cowalkId }),
        ]);
        console.log(recruitRes);
        setRecruitList(recruitRes);
        setCommentList(commentRes.data);
      } catch (e) {
        console.error("같이 산책 상세조회 또는 댓글 조회 실패", e);
      }
    };
    if (crewId) fetchCowalkList();
  }, [crewId, cowalkId]);

  const handleSubmit = async (comment: string, clear: () => void) => {
    try {
      await createCowalkComment({
        crewId,
        cowalkId,
        content: comment,
      });
      clear();
      const { data: updatedComments } = await getCowalkCommentList({
        crewId,
        cowalkId,
      });
      setCommentList(updatedComments);
    } catch (e) {
      console.error("댓글 작성 실패", e);
    }
  };

  return (
    <>
      <AppBar onBack={handleBack} title="게시글" />
      <PageWrapper>
        <ScrollContainer>
          <Bulletin>
            <HeaderContainer>
              <ProfileImg
                src={recruitList?.profileImageUrl || profileImg}
                alt="프로필 이미지"
              />
              <Container>
                <UserName>{recruitList?.nickname}</UserName>
                <Date>{recruitList?.createdDate}</Date>
              </Container>
            </HeaderContainer>
            <DetailContainer>
              <Content>{recruitList?.memo || "내용이 없습니다."}</Content>
              <JoinContent>
                {recruitList && <RecruitItem item={recruitList} />}
              </JoinContent>
            </DetailContainer>
            <ButtonWrapper>
              {fullEndDateTime.isAfter(dayjs()) && (
                <HalfButton>
                  <CheckButton
                    active={true}
                    label="참여하기"
                    onClick={clickJoin}
                  />
                </HalfButton>
              )}
            </ButtonWrapper>
          </Bulletin>
          <BottomScrollContainer>
            {commentList.length > 0 &&
              commentList.map((comment) => (
                <CommentItem
                  key={comment.commentId}
                  profileImageUrl={comment.profileImageUrl || profileImg}
                  nickname={comment.nickname}
                  createdDate={comment.createdDate}
                  content={comment.content}
                />
              ))}
          </BottomScrollContainer>
          <CommentBtn onSubmit={handleSubmit} />
        </ScrollContainer>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
