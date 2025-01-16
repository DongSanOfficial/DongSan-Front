import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "src/components/Header";
import TrailCardAll from "src/components/TrailCardAll_View";

interface Trail {
  id: number;
  name: string;
  date: string;
  length: number;
  image: string;
  tag: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 15px 15px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
`;

function TrailLikeListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const title =
    type === "favorites" ? "내가 좋아하는 산책로" : "북마크 이름 산책로";

  const trails: Trail[] = [
    {
      id: 1,
      name: "한국외대 근처 산책 스팟",
      date: "2024.09.26",
      length: 4.8,
      image: "src/assets/images/TrailThumbnail.png",
      tag: "#한국외대 #자취생_산책로",
    },
    {
      id: 2,
      name: "다른 산책로",
      date: "2024.10.01",
      length: 3.2,
      image: "src/assets/images/TrailThumbnail.png",
      tag: "#한국외대 #자취생_산책로",
    },
  ];
  const handleCardClick = () => {
    navigate("/mypage/TrailLikeList/detail/:walkwayId"); //api연동 시 id 연결되도록 수정
  };
  return (
    <>
      <Header title={title} showBackButton={true} onBack={() => navigate(-1)} />
      <Wrapper>
        <List>
          {trails.map((trail) => (
            <TrailCardAll
              key={trail.id}
              trail={trail}
              onClick={handleCardClick}
            />
          ))}
        </List>
      </Wrapper>
    </>
  );
}

export default TrailLikeListPage;
