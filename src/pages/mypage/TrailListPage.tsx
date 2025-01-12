import React from "react";
import styled from "styled-components";
import TrailCardAll from "../../components/TrailCardAll_View";
import { useNavigate } from "react-router-dom";

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
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 15px;
`;

function TrailListPage() {
  const navigate = useNavigate();
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
      id: 3,
      name: "다른 산책로",
      date: "2024.10.01",
      length: 3.2,
      image: "src/assets/images/TrailThumbnail.png",
      tag: "#한국외대 #자취생_산책로",
    },
    {
      id: 4,
      name: "다른 산책로",
      date: "2024.10.01",
      length: 3.2,
      image: "src/assets/images/TrailThumbnail.png",
      tag: "#한국외대 #자취생_산책로",
    },
    {
      id: 5,
      name: "다른 산책로",
      date: "2024.10.01",
      length: 3.2,
      image: "src/assets/images/TrailThumbnail.png",
      tag: "#한국외대 #자취생_산책로",
    },
    {
      id: 6,
      name: "다른 산책로",
      date: "2024.10.01",
      length: 3.2,
      image: "src/assets/images/TrailThumbnail.png",
      tag: "#한국외대 #자취생_산책로",
    },
  ];

  const handleCardClick = () => {
    navigate("/mypage/myregister/:walkwayId"); //api 연동시 id 연결되도록 수정
  };
  return (
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
  );
}

export default TrailListPage;
