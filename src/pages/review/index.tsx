import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "src/styles/colors/theme";
import { ReactComponent as StarIcon } from "../../assets/svg/ReviewStar.svg";
import Divider from "../../components/divider/Divider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { writingReview } from "src/apis/review/review";
import { WriteReviewType } from "src/apis/review/review.type";

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  align-items: center;
  justify-content: space-between;
  padding-top: 80px;
  &::-webkit-scrollbar {
    display: none;
  }
  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 12px;
  text-align: center;
`;

const RequiredMark = styled.span`
  color: ${theme.Red300};
`;

const Title = styled.span<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "18px"};
  font-weight: ${(props) => (props.fontSize === "13px" ? "normal" : "500")};
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 24px;
`;

const StyledStarIcon = styled(StarIcon)<{ isactive: string }>`
  cursor: pointer;
  path {
    fill: ${(props) =>
      props.isactive === "true" ? theme.Yellow : theme.Gray100};
  }
`;

const TextAreaWrapper = styled.div`
  position: relative;
  width: 320px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
`;

const CharCount = styled.div`
  position: absolute;
  right: 10px;
  bottom: 12px;
  color: #666;
  font-size: 9px;

  span {
    color: red;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? theme.Green500 : theme.Gray400};
  color: #ffffff;
  width: 356px;
  height: 52px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-top: 50px;
`;

const ReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const { walkwayId } = useParams<{ walkwayId: string }>();
  const walkwayHistoryId = location.state?.walkwayHistoryId;

  const isActive = rating > 0 && review.trim().length > 0;

  const handleSubmit = async () => {
    if (!walkwayId) {
      alert("산책로 ID가 없습니다.");
      return;
    }

    if (!walkwayHistoryId) {
      alert("산책 기록을 찾을 수 없습니다.");
      return;
    }

    try {
      const reviewData: WriteReviewType = {
        walkwayHistoryId,
        rating,
        content: review,
      };
      const response = await writingReview(Number(walkwayId), reviewData);
      console.log("리뷰 등록 성공:", response);
      setRating(0);
      setReview("");

      navigate(`/main/review/${walkwayId}/content`);
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response Data:", error.response.data);
        alert(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        alert("리뷰 등록 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };
  useEffect(() => {
    console.log("Location State:", location.state);
  }, [location.state]);

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="산책로 리뷰" />
      <CenterWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <RequiredMark>*</RequiredMark>
            <Title>이번 산책은 어떠셨나요?</Title>
          </TitleWrapper>

          <StarContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <StyledStarIcon
                key={value}
                isactive={((hoveredRating || rating) >= value).toString()}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(value)}
              />
            ))}
          </StarContainer>

          <Divider margin="0 0 2rem 0" height="3px" />

          <TitleWrapper>
            <RequiredMark>*</RequiredMark>
            <Title fontSize="13px">산책로에 대한 솔직 리뷰를 남겨주세요!</Title>
          </TitleWrapper>

          <TextAreaWrapper>
            <TextArea
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, 100))}
              placeholder="리뷰를 입력해주세요"
            />
            <CharCount>
              <span>{review.length}</span> / 100
            </CharCount>
          </TextAreaWrapper>
        </ContentWrapper>

        <Button isActive={isActive} onClick={handleSubmit}>
          리뷰 등록하기
        </Button>
      </CenterWrapper>
      <BottomNavigation />
    </>
  );
};

export default ReviewPage;
