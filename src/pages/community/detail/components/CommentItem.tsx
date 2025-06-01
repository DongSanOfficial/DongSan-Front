import styled from "styled-components";
import profileImg from "src/assets/images/profile.png";
import { theme } from "src/styles/colors/theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  margin: 0.2rem 0 0 10px;
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

export default function CommentItem() {
  return (
    <>
      <Wrapper>
        <Contain>
          <Img src={profileImg} />
          <ContainerWrapper>
            <Container>
              <Nickname>dongsan</Nickname>
              <Date>2025.05.16</Date>
            </Container>
            <Comment>저도 갈래요</Comment>
          </ContainerWrapper>
        </Contain>
      </Wrapper>
    </>
  );
}
