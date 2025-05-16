import React from "react";
import styled from "styled-components";
import { Trail } from "src/apis/walkway/walkway.type";
import CourseImage from "../map/CourseImage";

interface TrailCardProps {
  trail: Trail;
  onClick?: (walkwayId: number) => void;
}

const TrailContents = styled.div`
  flex: 0 0 auto;
  width: 280px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-left: 7px;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 320px;
    border-radius: 24px;
    padding: 12px;
    gap: 20px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    width: 360px;
    border-radius: 28px;
    padding: 15px;
  }
`;

const ImageContainer = styled.div`
  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    transform: scale(1.1);
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    transform: scale(1.15);
  }
`;

const MytrailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 60%;
  padding-right: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 12px;
    padding-right: 12px;
  }
`;

const MytrailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  font-weight: 900;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
    gap: 12px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const MytrailContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
  }
`;

const Mytrail = styled.div`
  font-size: 12px;
  color: #054630;
  font-weight: 600;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const MytrailLength = styled.div`
  font-size: 40px;
  font-family: "Lalezar";

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 46px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 50px;
  }
`;

const UnitSpan = styled.span`
  font-size: 12px;
  font-family: "Pretendard";

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

const TrailCard = ({ trail, onClick }: TrailCardProps) => (
  <TrailContents onClick={() => onClick?.(trail.walkwayId)}>
    <ImageContainer>
      <CourseImage
        src={trail.courseImageUrl}
        alt="산책로 이미지"
        size="100px"
      />
    </ImageContainer>
    <MytrailInfo>
      <MytrailHeader>
        <Mytrail>{trail.name}</Mytrail>
      </MytrailHeader>
      <MytrailContent>
        <div>코스 길이</div>
        <MytrailLength>
          {trail.distance}
          <UnitSpan>km</UnitSpan>
        </MytrailLength>
      </MytrailContent>
    </MytrailInfo>
  </TrailContents>
);

export default TrailCard;
