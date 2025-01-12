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
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "src/styles/colors/theme";
import { toggleLike } from "src/apis/likedWalkway";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  align-items: center;
  min-height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-height: 20vh;

  @media (max-width: 375px) {
    width: 85vw;
    max-width: 36rem;
    height: auto;
    min-height: 10vh;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0.625rem;
  @media (max-width: 375px) {
    margin: 0.125rem;
    font-size: 1rem;
  }
`;
const ShowField = styled.div`
  width: 80vw;
  height: 45vh;
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
  height: 30vh;
  width: 100%;
`;
const FieldContent = styled.div`
  width: 100%;
  height: 15vh;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 0.625rem 0.625rem;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;
const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  gap: 10px;
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
const BookmarkButton = styled.div<IconButtonProps>`
  display: flex;
`;
const ReviewCount = styled.div`
  font-size: 0.75rem;
`;
const Explanation = styled.div`
  font-size: 0.75rem;
  margin: 0.625rem;
  @media (max-width: 375px) {
    margin: 0 0.625rem;
  }
`;
const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.3125rem;
  margin: 0.625rem;
  @media (max-width: 375px) {
    margin: 0.3125rem 0.625rem;
  }
`;

const Hashtag = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0.125rem;
  flex-shrink: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  height: auto;
  max-height: 12vh;
  margin: 0.3rem 0;
`;
const Button = styled.button`
  color: #ffffff;
  width: 90vw;
  height: 3.5rem;
  padding: 0.2rem;
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 500;

  &:nth-child(1) {
    background-color: #888;
  }

  &:nth-child(2) {
    background-color: ${theme.Green500};
  }
  @media (max-width: 375px) {
    height: 2.5rem;
  }
`;

export default function DetailUsing() {
  const navigate = useNavigate();
  const { walkwayId } = useParams();
  const [heartCount, setHeartCount] = useState<number>(0);
  const [starCount, setStarCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [isHeartActive, setIsHeartActive] = useState<boolean>(false);
  const [isStarActive, setIsStarActive] = useState<boolean>(false);
  const [isBookmarkActive, setIsBookmarkActive] = useState<boolean>(false);
  const [hashtags, setHashtags] = useState<String[]>(["청계천", "호수"]);

  const toggleHeart = async (): Promise<void> => {
    if (!walkwayId) return;
    try {
      const result = await toggleLike({ walkwayId, isLiked: isHeartActive });
      console.log("Like toggled successfully:", result);
      setIsHeartActive(!isHeartActive);
      setHeartCount((prev) => (isHeartActive ? prev - 1 : prev + 1));
    } catch (error) {
      console.log("Failed to update likes: ", error);
    }
  };
  const toggleStar = (): void => {
    setIsStarActive(!isStarActive);
    setStarCount((prev) => (isStarActive ? prev - 1 : prev + 1));
  };
  const toggleBookmark = (): void => {
    setIsBookmarkActive(!isBookmarkActive);
  };
  const goToReviews = (): void => {
    navigate(`/review/${walkwayId}/content`);
  };
  const writeReview = (): void => {
    navigate(`/review/${walkwayId}`);
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Content>
          <DateDisplay />
        </Content>
        <Title>가을에 걷기 좋은 산책로</Title>
        <TrailInfo duration={"12:00"} distance={53} />
      </ContentWrapper>
      <ShowField>
        <Img src={trail} alt="Trail" />
        <FieldContent>
          <IconWrapper>
            <LeftIcon>
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
            </LeftIcon>
            <BookmarkButton active={isBookmarkActive} onClick={toggleBookmark}>
              {isBookmarkActive ? <BsBookmarkFill /> : <BsBookmark />}
            </BookmarkButton>
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
        <Button onClick={writeReview}>리뷰 작성하기</Button>
      </ButtonContainer>
    </Wrapper>
  );
}
