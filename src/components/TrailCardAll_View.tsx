import React from "react";
import styled from "styled-components";

interface Trail {
  id: number;
  name: string;
  date: string;
  length: number;
  image: string;
}

interface TrailCardProps {
  trail: Trail;
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
  padding: 16px;
`;
const MytrailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 70%;
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
  font-size: 40px;
  font-family: "Lalezar";
`;
const Course = styled.div`
  width: 70px;
  height: 70px;
  margin: 20px;
  background: #f3f3f3;
`;

const TrailCardAll: React.FC<TrailCardProps> = ({ trail }) => (
  <TrailContents key={trail.id}>
    <Course />
    <MytrailInfo>
      <MytrailHeader>
        <Mytrail>{trail.name}</Mytrail>
        <Mytrail>{trail.date}</Mytrail>
      </MytrailHeader>
      <MytrailContent>
        <div>코스 길이</div>
        <MytrailLength>
          {trail.length}
          <span style={{ fontSize: "12px", fontFamily: "Pretendard" }}>km</span>
        </MytrailLength>
      </MytrailContent>
    </MytrailInfo>
  </TrailContents>
);
export default TrailCardAll;
