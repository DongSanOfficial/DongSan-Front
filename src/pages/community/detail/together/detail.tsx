import BottomNavigation from "src/components/bottomNavigation";
import { MdMoreVert } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import profileImg from "src/assets/images/profile.png";
import CheckButton from "src/components/button/CheckButton";
import CommentBtn from "../components/CommentBtn";
import CommentItem from "../components/CommentItem";
import RecruitItem from "../components/RecruitItem";
import { getCowalkCommentList, getCowalkDetailList } from "src/apis/crew/crew";
import { useEffect, useState } from "react";
import { CowalkComment, Cowalkwithcrew } from "src/apis/crew/crew.type";

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
  //justify-content: space-between;
`;
const Bulletin = styled.div`
  width: 100%;
  max-height: 55%; // 원하는 최대 높이 지정
  //overflow-y: auto; // 넘칠 경우 스크롤 가능하게
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
  overflow-y: auto; // 넘칠 경우 스크롤 가능하게
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
  const handleBack = () => navigate(-1);

  const clickJoin = () => {};
  const [recruitList, setRecruitList] = useState<Cowalkwithcrew>();
  const [commentList, setCommentList] = useState<CowalkComment[]>([]);
  const location = useLocation();
  const crewId = location.state?.crewId;
  const cowalkId = location.state?.cowalkId;

  useEffect(() => {
    const fetchCowalkList = async () => {
      try {
        const [recruitRes, commentRes] = await Promise.all([
          getCowalkDetailList({ crewId, cowalkId }),
          getCowalkCommentList({ crewId, cowalkId }),
        ]);
        console.log(recruitRes);
        console.log(commentRes);
        setRecruitList(recruitRes);
        setCommentList(commentRes.data);
      } catch (e) {
        console.error("같이 산책 상세조회 또는 댓글 조회 실패", e);
      }
    };

    if (crewId) fetchCowalkList();
  }, [crewId, cowalkId]);
  return (
    <>
      <AppBar
        onBack={handleBack}
        title="게시글"
        rightIcon={<MdMoreVert size={20} />}
      />
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
              <Content>{recruitList?.content || "내용이 없습니다."}</Content>
              <JoinContent>
                {recruitList && <RecruitItem item={recruitList} />}
              </JoinContent>
            </DetailContainer>
            <ButtonWrapper>
              <HalfButton>
                <CheckButton
                  active={true}
                  label="참여하기"
                  onClick={clickJoin}
                />
              </HalfButton>
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
          <CommentBtn />
        </ScrollContainer>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
