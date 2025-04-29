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
import { deleteWalkway, getWalkwayDetail } from "src/apis/walkway";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import StarCount from "src/components/review/starCount";
import { BookmarkContent } from "./bookmark/components/BookmarkContent";
import { toggleLike } from "src/apis/likedWalkway";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import BottomSheet from "src/components/bottomsheet/BottomSheet";
import { useToast } from "src/hooks/useToast";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 15px 30px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    padding: 20px 40px;
    max-width: 1024px;
    margin: 0 auto;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
    margin: 0 auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const HeaderTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 5px 0;
  }
`;

// 산책로 정보 컴포넌트 관련
const PathTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 5px 0px 5px 0px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 1.5rem;
    margin: 8px 0px 10px 0px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 1.75rem;
  }
`;

const PathDate = styled.div`
  color: ${theme.Green500};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 1.1rem;
    gap: 6px;
  }
`;

const PathInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PathDescription = styled.div`
  font-size: 13px;
  margin: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 15px;
    margin: 15px;
    line-height: 1.5;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    font-size: 16px;
  }
`;

// 지도 관련
const MapSection = styled.div`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    max-width: 100%;
    margin: 20px auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 900px;
  }
`;

const MapBox = styled.div`
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px 20px 0px 0px;
  height: 35vh;
  overflow: hidden;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    height: 40vh;
    border-radius: 24px 24px 0px 0px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    height: 45vh;
  }
`;

const MapDetailsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    border-radius: 0px 0px 14px 14px;
  }
`;

// 유저 반응(좋아오, 별점, 리뷰) 관련
const ReactionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 15px;
  }
`;

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 8px;
  }
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
    margin-right: 4px;
  }
`;

// 해시태그 관련
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px;
  padding-bottom: 10px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 8px;
    margin: 15px;
    padding-bottom: 15px;
  }
`;

const TagItem = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 2px;
  display: inline-block;
  white-space: nowrap;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 14px;
    margin: 3px;
  }
`;

// 별점 관련
const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 0 3px;
  }
`;

const RatingGroup = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 13px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 15px;
    gap: 4px;
  }
`;

const RatingScore = styled.span`
  margin-right: 4px;
  color: ${theme.Gray700};

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin-right: 6px;
  }
`;

const StyledHeart = styled(HeartIcon)<{ $isActive: boolean }>`
  width: 15px;
  height: 15px;
  fill: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};
  cursor: pointer;
  transition: fill 0.2s ease;
  margin-right: 5px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    width: 18px;
    height: 18px;
    margin-right: 7px;
  }
`;

const BookmarkButton = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? theme.Green500 : theme.Gray200)};

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    transform: scale(1.2);
  }
`;

const EditButton = styled.button<{ isDelete?: boolean }>`
  background-color: ${(props) =>
    props.isDelete ? theme.White : theme.Gray400};
  color: ${(props) => (props.isDelete ? theme.Red400 : theme.White)};
  width: 100%;
  min-height: 52px;
  box-sizing: border-box;
  border: ${(props) => (props.isDelete ? "1.5px solid" : "none")};
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isDelete ? theme.Gray100 : theme.Gray500};
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    min-height: 58px;
    font-size: 18px;
    margin-top: 24px;
    border-radius: 6px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 800px;
  }
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
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.Green600};
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    min-height: 58px;
    font-size: 18px;
    margin-top: 14px;
    border-radius: 6px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 800px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin: 10px 0;
  }
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast();

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

  useEffect(() => {
    if (walkwayId) {
      fetchWalkwayDetail();
    }
  }, [walkwayId]);

  const toggleHeart = async (): Promise<void> => {
    if (walkwayDetail && walkwayId) {
      const updatedDetail = {
        ...walkwayDetail,
        isLiked: !walkwayDetail.isLiked,
        likeCount: walkwayDetail.likeCount + (walkwayDetail.isLiked ? -1 : 1),
      };
      setWalkwayDetail(updatedDetail);

      try {
        await toggleLike({
          walkwayId: +walkwayId, // "+" 연산자를 사용하여 바로 숫자로 변환
          isLiked: walkwayDetail.isLiked, // 기존 상태 전달
        });
      } catch (error) {
        console.error("좋아요 상태 변경 실패:", error);
        // 3. 실패 시 상태 롤백
        setWalkwayDetail(walkwayDetail);
      }
    }
  };
  // 북마크 클릭 시 바텀시트 오픈
  const toggleBottomSheet = () => setIsOpen((prev) => !prev);

  const handleBookmarkClick = () => {
    setIsOpen(true);
  };

  const goToReviews = (): void => {
    navigate(`/main/review/${walkwayId}/content`);
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
    // 신규등록시 확인 페이지에서 백버튼을 누른 경우 '수정하기' 버튼을 누른 것과 동일한 기능
    if (location.state?.from === "newRegistration") {
      const editData = {
        isEditMode: true,
        walkwayId: Number(walkwayId),
        name: walkwayDetail?.name,
        date: walkwayDetail?.date,
        description: walkwayDetail?.memo,
        hashtags: walkwayDetail?.hashtags.map((tag) => tag.replace("#", "")),
        totalDistance: walkwayDetail?.distance,
        duration: walkwayDetail?.time,
        accessLevel: walkwayDetail?.accessLevel,
        coordinates: walkwayDetail?.course.map((coord) => ({
          lat: coord.latitude,
          lng: coord.longitude,
        })),
      };

      navigate("/newway/registration", {
        state: editData,
      });
      return;
    }

    // 이전 상황:
    // 마이페이지에서 내가 등록한 산책로 프리뷰를 바로 클릭했을 때
    if (location.state?.from === "mypage") {
      navigate("/mypage");
    }
    // 내가 등록한 산책로 리스트에서 디테일 페이지로 이동했을 때
    else if (isMyPath) {
      navigate("/mypage/TrailList");
    }
    // 내가 좋아요한 산책로 리스트에서 ...
    else if (location.state?.from === "favorites") {
      navigate("/mypage/TrailList?type=favorites");
    }
    // 내가 북마크한 산책로 리스트에서 ...
    else if (
      location.state?.from === "bookmarks" &&
      location.state?.bookmarkId
    ) {
      navigate(
        `/mypage/TrailList?type=bookmarks&bookmarkId=${location.state.bookmarkId}`
      );
    }
    // 기본
    else {
      navigate("/main");
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deleteWalkway(Number(walkwayId));
      navigate(-1);
      showToast("산책로가 삭제되었습니다.", "success");
    } catch (error) {
      showToast("잠시후 다시 시도해주세요.", "error");
    } finally {
      closeDeleteModal();
    }
  };

  if (loading) return <LoadingSpinner />;
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
                    $isActive={walkwayDetail.isLiked}
                    onClick={toggleHeart}
                  />
                  {walkwayDetail.likeCount}
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
                onClick={handleBookmarkClick}
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

          {isMyPath && (
            <EditButton isDelete onClick={openDeleteModal}>
              삭제하기
            </EditButton>
          )}
          {walkwayHistory.canReview && (
            <ReviewButton onClick={handleReviewClick}>
              리뷰 작성하기
            </ReviewButton>
          )}
        </ButtonContainer>
      </PageWrapper>

      <BottomSheet
        isOpen={isOpen}
        onClose={toggleBottomSheet}
        height="50vh"
        minHeight="0px"
        showPreview={true}
        closeOnOutsideClick={true}
      >
        <div>
          <BookmarkContent onComplete={() => toggleBottomSheet} />
        </div>
      </BottomSheet>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        message="정말 이 산책로를 삭제하시겠습니까? 삭제된 산책로는 복구할 수 없습니다."
        cancelText="취소"
        confirmText="삭제"
        modalType="delete"
      />
      <BottomNavigation />
    </>
  );
}
