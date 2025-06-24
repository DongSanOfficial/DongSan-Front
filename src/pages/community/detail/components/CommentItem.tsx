import styled from "styled-components";
import profileImg from "src/assets/images/profile.png";
import { theme } from "src/styles/colors/theme";
import { CowalkComment } from "src/apis/crew/crew.type";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`;
const Contain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
`;
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  gap: 0.5rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${theme.Black};
  //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  margin-top: 0.2rem;
`;
const Nickname = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const Date = styled.div`
  font-size: 14px;
  color: ${theme.Gray400};
`;
const Comment = styled.div``;

export default function CommentItem({
  profileImageUrl,
  nickname,
  createdDate,
  content,
}: CowalkComment) {
  return (
    <>
      <Wrapper>
        <Contain>
          <Img src={profileImageUrl || profileImg} />
          <ContainerWrapper>
            <Container>
              <Nickname>{nickname}</Nickname>
              <Date>{createdDate}</Date>
            </Container>
            <Comment>{content}</Comment>
          </ContainerWrapper>
        </Contain>
      </Wrapper>
    </>
  );
}
