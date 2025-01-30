import styled from "styled-components";
import { ReactComponent as StarIcon } from "../../assets/svg/Star.svg";
import { ReactComponent as HeartIcon } from "../../assets/svg/Heart.svg";
import { BiCalendarCheck } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { theme } from "src/styles/colors/theme";
import AppBar from "src/components/appBar";
import PathMap from "src/components/map/PathMap";
import BottomNavigation from "src/components/bottomNavigation";
import TrailInfo from "src/components/newway_register/TrailInfo";
import { getWalkwayDetail } from "src/apis/walkway";
import { WalkwayDetail } from "src/apis/walkway.type";

interface ReactionButtonProps {
  active?: boolean;
}

const PageWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 430px;
`;

const PathTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 5px 0px 5px 0px;
`;

const PathDate = styled.div`
  color: ${theme.Green500};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PathInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PathDescription = styled.div`
  font-size: 13px;
  margin: 10px;
`;

const MapSection = styled.div`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  width: 100%;
`;

const MapBox = styled.div`
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  height: 35vh;
  overflow: hidden;
`;

const MapDetailsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;
`;

const ReactionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReactionButton = styled.div<ReactionButtonProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 2px;
  color: ${(props) => (props.active ? "red" : "black")};
`;

const BookmarkButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
`;

const WalkButton = styled.button`
  background-color: #888;
  color: #ffffff;
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 5px;
  margin: 10px;
  padding-bottom: 10px;
`;

const TagItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
  flex-shrink: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RatingGroup = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 13px;
`;

const RatingScore = styled.span`
  margin-right: 4px;
  color: ${theme.Gray700};
`;

const StarBox = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
`;

const StyledStar = styled(StarIcon)<{ isactive: string }>`
  width: 14px;
  height: 14px;
  position: absolute;
  left: 0;
  path {
    fill: ${({ isactive }) =>
      isactive === "true" ? theme.Yellow : theme.Gray100};
  }
`;

const PartialStar = styled(StyledStar)<{ width: number }>`
  clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0)`};
  path {
    fill: ${theme.Yellow};
  }
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  fill: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
  cursor: pointer;
  transition: fill 0.2s ease;
`;

export default function RecommendTrail() {
  const navigate = useNavigate();
  const { walkwayId } = useParams<{ walkwayId: string }>();
  const [walkwayDetail, setWalkwayDetail] = useState<WalkwayDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: API 호출로 북마크 상태 업데이트
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((value) => {
      const diff = rating - (value - 1);
      const percentage = Math.min(Math.max(diff, 0), 1) * 100;

      return (
        <StarBox key={value}>
          <StyledStar isactive="false" />
          {percentage > 0 && <PartialStar width={percentage} isactive="true" />}
        </StarBox>
      );
    });
  };

  useEffect(() => {
    const fetchWalkwayDetail = async () => {
      try {
        setLoading(true);
        const data = await getWalkwayDetail(Number(walkwayId));
        setWalkwayDetail(data);
        setIsLiked(data.isLike);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("산책로 정보를 불러오는데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (walkwayId) {
      fetchWalkwayDetail();
    }
  }, [walkwayId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!walkwayDetail) return null;

  return (
    <>
      <AppBar onBack={() => navigate(-1)} title="산책로" />
      <PageWrapper>
        <HeaderContainer>
          <HeaderTopBar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiCalendarCheck />
              <PathDate>{walkwayDetail.date}</PathDate>
            </div>
          </HeaderTopBar>
          <PathTitle>{walkwayDetail.name}</PathTitle>
          <PathInfoContainer>
            <TrailInfo
              duration={walkwayDetail.time}
              distance={walkwayDetail.distance}
            />
          </PathInfoContainer>
        </HeaderContainer>

        <MapSection>
          <MapBox>
            <PathMap
              pathCoords={walkwayDetail.course.map((loc) => ({
                lat: loc.latitude,
                lng: loc.longitude,
              }))}
            />
          </MapBox>
          <MapDetailsContainer>
            <ReactionBar>
              <LeftIcon>
                <ReactionButton>
                  <StyledHeart
                    $isActive={isLiked}
                    onClick={() => {
                      setIsLiked(!isLiked);
                      // TODO: API 호출로 좋아요 상태 업데이트
                    }}
                  />
                  {likeCount}
                </ReactionButton>
                <RatingContainer>
                  <RatingGroup>
                    {renderStars(walkwayDetail.rating)}
                    <RatingScore>{walkwayDetail.rating.toFixed(1)}</RatingScore>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/reviews/${walkwayId}`)}
                    >
                      리뷰 {walkwayDetail.reviewCount}개
                    </span>
                  </RatingGroup>
                </RatingContainer>
                <ReactionButton
                  onClick={() => navigate(`/main/review/:walkwayId/content`)}
                  // TODO: API 리뷰 페이지 이동 업데이트
                  style={{ cursor: "pointer" }}
                >
                  <MdArrowForwardIos size={16} />
                </ReactionButton>
              </LeftIcon>
              <BookmarkButton $isActive={isBookmarked} onClick={toggleBookmark}>
                {isBookmarked ? (
                  <BsBookmarkFill size={20} />
                ) : (
                  <BsBookmark size={20} />
                )}
              </BookmarkButton>
            </ReactionBar>
            <PathDescription>{walkwayDetail.memo}</PathDescription>
            {walkwayDetail.hashTags && walkwayDetail.hashTags.length > 0 && (
              <TagsContainer>
                {walkwayDetail.hashTags.map((hashtag, index) => (
                  <TagItem key={index}> #{hashtag}</TagItem>
                ))}
              </TagsContainer>
            )}
          </MapDetailsContainer>
        </MapSection>
        <WalkButton onClick={() => navigate("/usingtrail")}>
          이용하기
        </WalkButton>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
