import styled from "styled-components";
import ToggleSwitch from "../../components/newway_register/ToggleSwitch";
import TrailInfo from "../../components/newway_register/TrailInfo";
import { ReactComponent as HeartIcon } from "../../assets/svg/Heart.svg";
import { MdArrowForwardIos } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { theme } from "src/styles/colors/theme";
import PathMap from "../../components/map/PathMap";
import BottomNavigation from "../../components/bottomNavigation";
import AppBar from "../../components/appBar";
import { WalkwayDetail } from "src/apis/walkway.type";
import { getWalkwayDetail } from "src/apis/walkway";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import StarCount from "src/components/review/starCount";

// 레이아웃 관련
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
  max-width: 430px;
`;

const HeaderTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 430px;
`;

// 산책로 정보 컴포넌트 관련
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

// 지도 관련
const MapSection = styled.div`
  max-width: 80vw;
  // height: 100%;
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

// 유저 반응(좋아오, 별점, 리뷰) 관련
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

interface ReactionButtonProps {
  active?: boolean;
}

const ReactionButton = styled.div<ReactionButtonProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 2px;
  color: ${(props) => (props.active ? "red" : "black")};
`;

const EditButton = styled.button`
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

// 해시태그 관련
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

// 별점 관련
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

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  fill: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
  cursor: pointer;
  transition: fill 0.2s ease;
  margin-right: 5px;
`;

const BookmarkButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
`;

// 리뷰 작성하기 버튼
const ReviewButton = styled.button`
  background-color: ${theme.Green500};
  color: #ffffff;
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  border: none;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface PathDetailsProps {
  isMyPath?: boolean;
}

export default function PathDetails({ isMyPath = false }: PathDetailsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { walkwayId } = useParams<{ walkwayId: string }>();
  const [walkwayDetail, setWalkwayDetail] = useState<WalkwayDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [walkwayHistory, setWalkwayHistory] = useState<{
    historyId?: number;
    canReview?: boolean;
  }>({});

  useEffect(() => {
    const fetchWalkwayDetail = async () => {
      try {
        setLoading(true);
        const data = await getWalkwayDetail(Number(walkwayId));
        setWalkwayDetail(data);
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

  const toggleHeart = (): void => {
    if (walkwayDetail) {
      setWalkwayDetail({
        ...walkwayDetail,
        isLike: !walkwayDetail.isLike,
        likeCount: walkwayDetail.likeCount + (walkwayDetail.isLike ? -1 : 1),
      });
    }
    // TODO: API 호출로 좋아요 상태 업데이트
  };

  const toggleBookmark = () => {
    if (walkwayDetail) {
      setWalkwayDetail({
        ...walkwayDetail,
        marked: !walkwayDetail.marked,
      });
    }
    // TODO: API 북마크
  };

  const goToReviews = (): void => {
    navigate(`/main/review/${walkwayId}/content`);
    // TODO: API 리뷰 페이지 이동 업데이트
  };

  const handleEditClick = () => {
    const editData = {
      isEditMode: true,
      walkwayId: Number(walkwayId),
      name: walkwayDetail?.name,
      date: walkwayDetail?.date,
      description: walkwayDetail?.memo,
      //서버에서 #가 붙은채로 와서 #를 제거
      hashtags: walkwayDetail?.hashtags.map((tag) => tag.replace("#", "")),
      totalDistance: walkwayDetail?.distance,
      duration: walkwayDetail?.time,
      accessLevel: walkwayDetail?.accessLevel,
      coordinates: walkwayDetail?.course.map((coord) => ({
        lat: coord.latitude,
        lng: coord.longitude,
      })),
    };

    console.log("수정을 위해 전달하는 데이터:", editData);

    navigate("/newway/registration", {
      state: editData,
    });
  };

  const handleWalkClick = () => {
    navigate("/newway", {
      state: {
        mode: "follow",
        walkwayId: walkwayId,
      },
    });
  };

  useEffect(() => {
    if (location.state?.historyId && location.state?.canReview !== undefined) {
      setWalkwayHistory({
        historyId: location.state.historyId,
        canReview: location.state.canReview,
      });
    }
  }, [location.state]);

  const handleReviewClick = () => {
    if (walkwayHistory.historyId) {
      navigate(`/main/review/${walkwayId}`, {
        state: { walkwayHistoryId: walkwayHistory.historyId },
      });
    }
  };

  const handleBack = () => {
    if (location.state?.from === "mypage") {
      navigate("/mypage"); // 마이페이지로 직접 이동
    } else if (isMyPath) {
      navigate("/mypage/TrailList"); // 전체보기 페이지로 이동
    } else {
      navigate("/main"); // 메인으로
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!walkwayDetail) return null;

  return (
    <>
      <AppBar onBack={handleBack} title={isMyPath ? "내 산책로" : "산책로"} />
      <PageWrapper>
        <HeaderContainer>
          <HeaderTopBar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiCalendarCheck
                style={{ color: "black", width: "27px", height: "27px" }}
              />
              <PathDate>{walkwayDetail.date}</PathDate>
            </div>
            {isMyPath && (
              <ToggleSwitch
                isPublic={walkwayDetail.accessLevel === "PUBLIC"}
                readOnly={true}
              />
            )}
          </HeaderTopBar>
          <PathTitle>{walkwayDetail.name}</PathTitle>
          <PathInfoContainer>
            <TrailInfo
              duration={walkwayDetail.time}
              distance={walkwayDetail.distance}
              isRegistration={true}
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
                    $isActive={walkwayDetail.isLike}
                    onClick={toggleHeart}
                  />
                  {walkwayDetail.likeCount}
                  {/* 서버 디비에 좋아요 수 추가되면 필드명 반영하기 */}
                </ReactionButton>
                <RatingContainer>
                  <RatingGroup>
                    <StarCount rating={walkwayDetail.rating} size={14} />
                    <RatingScore>{walkwayDetail.rating.toFixed(1)}</RatingScore>
                    <span>리뷰 {walkwayDetail.reviewCount}개</span>
                  </RatingGroup>
                </RatingContainer>
                <ReactionButton
                  onClick={goToReviews}
                  style={{ cursor: "pointer" }}
                >
                  <MdArrowForwardIos />
                </ReactionButton>
              </LeftIcon>
              <BookmarkButton
                $isActive={walkwayDetail.marked}
                onClick={toggleBookmark}
              >
                {walkwayDetail.marked ? (
                  <BsBookmarkFill size={20} />
                ) : (
                  <BsBookmark size={20} />
                )}
              </BookmarkButton>
            </ReactionBar>
            <PathDescription>{walkwayDetail.memo}</PathDescription>
            {walkwayDetail.hashtags && walkwayDetail.hashtags.length > 0 && (
              <TagsContainer>
                {walkwayDetail.hashtags.map((hashtag, index) => (
                  <TagItem key={index}>{hashtag}</TagItem>
                ))}
              </TagsContainer>
            )}
          </MapDetailsContainer>
        </MapSection>
        <ButtonContainer>
          <EditButton onClick={isMyPath ? handleEditClick : handleWalkClick}>
            {isMyPath ? "수정하기" : "이용하기"}
          </EditButton>
          {/* 테스트시
          {walkwayHistory.canReview === false && ( */}
          {walkwayHistory.canReview && (
            <ReviewButton onClick={handleReviewClick}>
              리뷰 작성하기
            </ReviewButton>
          )}
        </ButtonContainer>
      </PageWrapper>
      <BottomNavigation />
    </>
  );
}
