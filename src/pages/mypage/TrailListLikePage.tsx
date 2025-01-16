import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "src/components/Header";
import TrailCardAll from "src/components/TrailCardAll_View";
import { Trail, getTrails } from "../../apis/trail";

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

function TrailLikeListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const title =
    type === "favorites" ? "내가 좋아하는 산책로" : "북마크 이름 산책로";

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const fetchedTrails = await getTrails(); // 실제 구현에 따라 API 변경이 필요할 수 있습니다.
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
  }, [type]); // type이 변경되면 API 다시 호출

  return (
    <>
      <Header title={title} showBackButton={true} onBack={() => navigate(-1)} />
      <Wrapper>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <List>
            {trails.map((trail) => (
              <TrailCardAll key={trail.walkwayId} trail={trail} />
            ))}
          </List>
        )}
      </Wrapper>
    </>
  );
}

export default TrailLikeListPage;
