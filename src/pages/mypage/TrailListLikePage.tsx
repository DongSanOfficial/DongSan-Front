import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TrailCardAll from "src/components/TrailCardAll_View";
import { Trail, getTrails } from "../../apis/trail";
import AppBar from "src/components/appBar";
import BottomNavigation from "src/components/bottomNavigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function TrailListLikePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const title =
    type === "favorites" ? "내가 좋아하는 산책로" : "북마크 이름 산책로";

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const fetchedTrails = await getTrails();
        if (type === "favorites") {
          setTrails(
            fetchedTrails.filter((trail) =>
              trail.hashtags.includes("favorites")
            )
          );
        } else {
          setTrails(fetchedTrails);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch trails");
        setLoading(false);
      }
    };

    fetchTrails();
  }, [type]);

  const handleCardClick = (walkwayId: number) => {
    navigate(`/main/recommend/detail/${walkwayId}`);
  };

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title={title} />
      <Wrapper>
        <List>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {!loading &&
            !error &&
            trails.map((trail) => (
              <TrailCardAll
                key={trail.walkwayId}
                trail={trail}
                onClick={handleCardClick}
              />
            ))}
        </List>
      </Wrapper>
      <BottomNavigation />
    </>
  );
}
