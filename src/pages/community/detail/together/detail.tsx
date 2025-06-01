import BottomNavigation from "src/components/bottomNavigation";
import { MdMoreVert } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppBar from "src/components/appBar";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import profileImg from "src/assets/images/profile.png";
import CheckButton from "src/components/button/CheckButton";
import CommentBtn from "../components/CommentBtn";

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
const Bulletin = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid ${theme.Gray500};
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
  padding: 1rem;
  font-size: 18px;
  font-weight: 700;
`;
const JoinContent = styled.div`
  border: 1px solid ${theme.Green500};
  width: 100%;
  height: 6rem;
  border-radius: 16px;
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
              <ProfileImg src={profileImg} alt="프로필 이미지" />
              <Container>
                <UserName>노성원</UserName>
                <Date>2025.05.04</Date>
              </Container>
            </HeaderContainer>
            <DetailContainer>
              <Content>안녕하세요안녕하세요</Content>
              <JoinContent />
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
          <CommentBtn />
        </ScrollContainer>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
