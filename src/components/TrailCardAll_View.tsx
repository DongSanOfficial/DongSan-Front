import React from "react";
import styled from "styled-components";

interface Trail {
  id: number;
  name: string;
  date: string;
  length: number;
  image: string;
  tag: string;
}

interface TrailCardProps {
  trail: Trail;
  onClick?: () => void;
}

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
`;
const MytrailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 60%;
  padding-right: 10px;
`;
const MytrailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: #054630;
  font-weight: 600;
`;
const MytrailContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;
const Mytrail = styled.div`
  font-size: 12px;
  color: #054630;
  font-weight: 600;
`;
const MytrailLength = styled.div`
  font-size: 35px;
  font-family: "Lalezar";
`;
const Course = styled.div`
  width: 100px;
  height: 100px;
  margin: 20px;
  background: #f3f3f3;
  border-radius: 10px;
`;

const TrailCardAll: React.FC<TrailCardProps> = ({ trail, onClick }) => (
  <TrailContents key={trail.id} onClick={onClick}>
    <Course />
    <MytrailInfo>
      <MytrailHeader>
        <Mytrail>{trail.name}</Mytrail>
        <Mytrail>{trail.date}</Mytrail>
      </MytrailHeader>
      <MytrailContent>
        <div>{trail.tag}</div>
        <div>산책로 길이</div>
      </MytrailContent>
      <MytrailContent>
        <div></div>
        <MytrailLength>{trail.length}km</MytrailLength>
      </MytrailContent>
    </MytrailInfo>
  </TrailContents>
);
export default TrailCardAll;
