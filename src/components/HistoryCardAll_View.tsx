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
`;

const MytrailInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-right: 10px;
`;

const MytrailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  color: #054630;
  font-size: 18px;
  font-weight: 600;
`;

const MytrailContent = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
`;

const Mytrailhashtag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 12px;
`;

const MytrailSubContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

const MytrailLength = styled.div`
  font-size: 35px;
  font-family: "Lalezar";
`;

interface HistoryCardProps {
  history: walkwayHistoryType;
  onClick?: (walkwayId: number) => void;
}

function HistoryCardAll({ history, onClick }: HistoryCardProps) {
  return (
    <TrailContents onClick={() => onClick?.(history.walkwayId)}>
      <div style={{ padding: "10px" }}>
        <CourseImage
          src={history.courseImageUrl}
          alt="산책로 이미지"
          size="100px"
        />
      </div>
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
