import styled from "styled-components";
import DateDisplay from "src/components/newway_register/DateDisplay";
import ToggleSwitch from "src/components/newway_register/ToggleSwitch";
import TrailInfo from "src/components/newway_register/TrailInfo";
import trail from "src/assets/images/trail.png";
import {
  MdOutlineStarBorder,
  MdOutlineStar,
  MdArrowForwardIos,
} from "react-icons/md";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "src/styles/colors/theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  max-height: 100vh;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15vh;
  max-height: 20vh;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 10px;
`;
const ShowField = styled.div`
  border: 2px solid red;
  width: 80vw;
  height: 50vh; /* 상단과 하단 여백을 계산 */
  max-width: 322px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
`;

const Img = styled.img`
  background: #c7c7c7;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  width: 80vw;
  //max-height: 276px;
`;
const FieldContent = styled.div`
  width: 80vw;
  max-width: 322px;
  height: 15vh;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 150px;
  margin: 10px;
`;
interface IconButtonProps {
  active?: boolean;
}
const IconButton = styled.div<IconButtonProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: ${(props) => (props.active ? "red" : "black")};
`;
const ReviewCount = styled.div`
  font-size: 12px;
`;
const Explanation = styled.div`
  font-size: 12px;
  margin: 10px;
`;
const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 5px;
  margin: 10px;
`;

const Hashtag = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
  flex-shrink: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 15vh;
`;
const Button = styled.button`
  color: #ffffff;
  width: 90vw;
  height: 6vh;
  border: none;
  font-size: 16px;
  font-weight: 500;

  &:nth-child(1) {
    background-color: #888;
  }

  &:nth-child(2) {
    background-color: ${theme.Green500};
  }
`;

export default function DetailUsing() {
  const navigate = useNavigate();
  const [heartCount, setHeartCount] = useState<number>(0);
  const [starCount, setStarCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [isHeartActive, setIsHeartActive] = useState<boolean>(false);
  const [isStarActive, setIsStarActive] = useState<boolean>(false);
  const [hashtags, setHashtgs] = useState<String[]>(["청계천", "호수"]);

  const toggleHeart = (): void => {
    setIsHeartActive(!isHeartActive);
    setHeartCount((prev) => (isHeartActive ? prev - 1 : prev + 1));
  };
  const toggleStar = (): void => {
    setIsStarActive(!isStarActive);
    setStarCount((prev) => (isStarActive ? prev - 1 : prev + 1));
  };
  const goToReviews = (): void => {
    navigate("/reviews");
  };
  const writeReview = (): void => {
    navigate("/review");
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Content>
          <DateDisplay />
          <ToggleSwitch />
        </Content>
        <Title>가을에 걷기 좋은 산책로</Title>
        <TrailInfo duration={"12:00"} distance={53} />
      </ContentWrapper>
      <ShowField>
        <Img src={trail} alt="Trail" />
        <FieldContent>
          <IconWrapper>
            <IconButton active={isHeartActive} onClick={toggleHeart}>
              {isHeartActive ? (
                <IoMdHeart size={20} />
              ) : (
                <IoMdHeartEmpty size={20} />
              )}{" "}
              {heartCount}
            </IconButton>
            <IconButton active={isStarActive} onClick={toggleStar}>
              {isStarActive ? (
                <MdOutlineStar size={20} />
              ) : (
                <MdOutlineStarBorder size={20} />
              )}{" "}
              {starCount}
            </IconButton>
            <ReviewCount>리뷰 {reviewCount}개</ReviewCount>
            <IconButton onClick={goToReviews}>
              <MdArrowForwardIos />
            </IconButton>
          </IconWrapper>

          <Explanation>풍경 좋은 청계천 근처 산책로! 걸어보세용</Explanation>
          <HashtagContainer>
            {hashtags.map((hashtag, index) => (
              <Hashtag key={index}> #{hashtag}</Hashtag>
            ))}
          </HashtagContainer>
        </FieldContent>
      </ShowField>
      <ButtonContainer>
        <Button>이용하기</Button>
        <Button onClick={writeReview}>리뷰작성하기</Button>
      </ButtonContainer>
    </Wrapper>
  );
}
