import React from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { Trail } from "../apis/trail";

const TrailContents = styled.div`
  flex: 0 0 auto;
  width: 350px;
  height: 134px;
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
  justify-content: space-between;
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
  font-size: 12px;
  // color: #929292;
`;

const MytrailSubContent = styled.div`
  display: flex;
  font-size: 12px;
`;

const MytrailLength = styled.div`
  font-size: 35px;
  font-family: "Lalezar";
`;

const Course = styled.div<CourseProps>`
  width: 100px;
  height: 100px;
  margin: 20px;
  background-image: url(${(props) => props.courseImageUrl});
  background-size: cover;
  border-radius: 10px;
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

interface CourseProps {
  courseImageUrl: string;
}

const TrailCardAll = ({ trail, onClick }: TrailCardProps) => (
  <TrailContents onClick={() => onClick?.(trail.walkwayId)}>
    <Course courseImageUrl={trail.courseImageUrl} />
    <MytrailInfo>
      <MytrailHeader>{trail.name}</MytrailHeader>
      <Mytrailhashtag>#{trail.hashtags.join(" #")}</Mytrailhashtag>
      <MytrailSubContent>
        {trail.rating}
        <ReviewStars>
          {Array.from({ length: trail.rating }).map((_, index) => (
            <FaStar key={index} />
          ))}
        </ReviewStars>
        리뷰{trail.reviewCount}개
      </MytrailSubContent>
      <MytrailContent>
        <MytrailLength>{trail.distance}km</MytrailLength>
      </MytrailContent>
    </MytrailInfo>
  </TrailContents>
);

export default TrailCardAll;
