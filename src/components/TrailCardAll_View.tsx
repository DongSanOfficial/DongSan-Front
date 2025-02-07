import React from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { Trail } from "../apis/walkway.type";
import CourseImage from "./map/CourseImage";

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

const ReviewStars = styled.div`
  display: flex;
  align-items: center;
  margin: 0 4px;
  color: #fbbc05;
`;

interface TrailCardProps {
  trail: Trail;
  onClick?: (walkwayId: number) => void;
}

function TrailCardAll({ trail, onClick }: TrailCardProps) {
  return (
    <TrailContents onClick={() => onClick?.(trail.walkwayId)}>
      <div style={{ padding: "10px" }}>
        <CourseImage
          src={trail.courseImageUrl}
          alt="산책로 이미지"
          size="100px"
        />
      </div>
      <MytrailInfo>
        <MytrailHeader>{trail.name}</MytrailHeader>
        <Mytrailhashtag>
          {trail.hashtags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </Mytrailhashtag>
        <MytrailSubContent>
          <span>{trail.rating.toFixed(1)}</span>
          <ReviewStars>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                style={{
                  color:
                    index < Math.round(trail.rating) ? "#FBBC05" : "#E0E0E0",
                }}
              />
            ))}
          </ReviewStars>
          <span>리뷰 {trail.reviewCount.toLocaleString()}개</span>
        </MytrailSubContent>
        <MytrailContent>
          <MytrailLength>{trail.distance}km</MytrailLength>
        </MytrailContent>
      </MytrailInfo>
    </TrailContents>
  );
}

export default TrailCardAll;
