import React from "react";
import styled from "styled-components";
import { Trail } from "../apis/walkway.type";
import CourseImage from "./map/CourseImage";
import StarCount from "./review/starCount";
import { walkwayHistoryType } from "@/apis/review.type";

const TrailContents = styled.div`
  flex: 0 0 auto;
  width: calc(100dvw - 50px);
  max-width: 400px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    max-width: 500px;
    padding: 5px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 600px;
  }
`;

const MytrailInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-right: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    width: 65%;
    padding-right: 15px;
  }
`;

const MytrailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: #054630;
  font-size: 18px;
  font-weight: 600;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`;

const MytrailContent = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

const Mytrailhashtag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 12px;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    font-size: 14px;
    gap: 6px;
  }
`;

const MytrailSubContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    font-size: 14px;
    gap: 6px;
  }
`;

const MytrailLength = styled.div`
  font-size: 35px;
  font-family: "Lalezar";

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

const ImageWrapper = styled.div`
  padding: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    padding: 12px;
  }
`;

interface HistoryCardProps {
  history: walkwayHistoryType;
  onClick?: (walkwayId: number) => void;
}

function HistoryCardAll({ history, onClick }: HistoryCardProps) {
  return (
    <TrailContents onClick={() => onClick?.(history.walkwayId)}>
      <ImageWrapper>
        <CourseImage
          src={history.courseImageUrl}
          alt="산책로 이미지"
          size="100px"
        />
      </ImageWrapper>
      <MytrailInfo>
        <MytrailHeader>{history.name}</MytrailHeader>
        <Mytrailhashtag>
          {history.hashtags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </Mytrailhashtag>
        <MytrailSubContent>
          <span>{history.rating.toFixed(1)}</span>
          <StarCount rating={history.rating} size={12} />
          <span>리뷰 {history.reviewCount.toLocaleString()}개</span>
        </MytrailSubContent>
        <MytrailContent>
          <MytrailLength>{history.distance}km</MytrailLength>
        </MytrailContent>
      </MytrailInfo>
    </TrailContents>
  );
}

export default HistoryCardAll;
