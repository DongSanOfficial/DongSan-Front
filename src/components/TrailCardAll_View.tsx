import React from "react";
import styled from "styled-components";
import CourseImage from "./map/CourseImage";
import StarCount from "./review/starCount";

const TrailContents = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 auto;
  padding: 10px;
`;

const MytrailInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 10px 10px 0;
  min-width: 0;
`;

const MytrailHeader = styled.div`
  color: #054630;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Mytrailhashtag = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 12px;
  margin-bottom: 4px;
`;

const MytrailSubContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-bottom: 4px;
`;

const MytrailLength = styled.div`
  font-size: 35px;
  font-family: "Lalezar";
  text-align: right;
`;

interface TrailCardProps {
  trail: {
    walkwayId: number;
    name: string;
    distance: number;
    courseImageUrl: string;
    hashtags: string[];
    rating: number;
    reviewCount: number;
    time?: number;
    memo?: string;
    likeCount?: number;
    date?: string;
  };
  onClick?: (walkwayId: number) => void;
}

function TrailCardAll({ trail, onClick }: TrailCardProps) {
  const getRating = () => {
    return typeof trail.rating === 'number' ? trail.rating : 0;
  };

  const getReviewCount = () => {
    return typeof trail.reviewCount === 'number' ? trail.reviewCount : 0;
  };

  return (
    <TrailContents onClick={() => onClick?.(trail.walkwayId)}>
      <ImageContainer>
        <CourseImage
          src={trail.courseImageUrl}
          alt="산책로 이미지"
          size="100px"
        />
      </ImageContainer>
      <MytrailInfo>
        <MytrailHeader>{trail.name}</MytrailHeader>
        <Mytrailhashtag>
          {trail.hashtags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </Mytrailhashtag>
        <MytrailSubContent>
          <span>{getRating().toFixed(1)}</span>
          <StarCount rating={getRating()} size={12} />
          <span>리뷰 {getReviewCount().toLocaleString()}개</span>
        </MytrailSubContent>
        <MytrailLength>{trail.distance}km</MytrailLength>
      </MytrailInfo>
    </TrailContents>
  );
}

export default TrailCardAll;