import S from "./detail.styles";
import ToggleSwitch from "../register/components/ToggleSwitch";
import TrailInfo from "../newway/components/TrailInfo";
import { MdArrowForwardIos } from "react-icons/md";
import { BiCalendarCheck } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PathMap from "../../components/map/PathMap";
import BottomNavigation from "../../components/bottomNavigation";
import AppBar from "../../components/appBar";
import { WalkwayDetail } from "src/apis/walkway/walkway.type";
import { deleteWalkway, getWalkwayDetail } from "src/apis/walkway/walkway";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import StarCount from "src/pages/review/components/starCount";
import { BookmarkSheet } from "./components/BookmarkSheet";
import { toggleLike } from "src/apis/walkway/walkway";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import BottomSheet from "src/components/bottomsheet/BottomSheet";
import { useToast } from "src/context/toast/useToast";
import Modal from "../../components/modal/Modal";

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
    else if (location.state?.from === "myReviews") {
      navigate("/mypage/ReviewList");
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
      <S.PageWrapper>
        <S.HeaderContainer>
          <S.HeaderTopBar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiCalendarCheck
                style={{ color: "black", width: "27px", height: "27px" }}
              />
              <S.PathDate>{walkwayDetail.date}</S.PathDate>
            </div>
            {isMyPath && (
              <ToggleSwitch
                isPublic={walkwayDetail.accessLevel === "PUBLIC"}
                readOnly={true}
              />
            )}
          </S.HeaderTopBar>
          <S.PathTitle>{walkwayDetail.name}</S.PathTitle>
          <S.PathInfoContainer>
            <TrailInfo
              duration={walkwayDetail.time}
              distance={walkwayDetail.distance}
              isRegistration={true}
            />
          </S.PathInfoContainer>
        </S.HeaderContainer>
        <S.MapSection>
          <S.MapBox>
            <PathMap
              pathCoords={walkwayDetail.course.map((loc) => ({
                lat: loc.latitude,
                lng: loc.longitude,
              }))}
            />
          </S.MapBox>
          <S.MapDetailsContainer>
            <S.ReactionBar>
              <S.LeftIcon>
                <S.ReactionButton>
                  <S.StyledHeart
                    $isActive={walkwayDetail.isLiked}
                    onClick={toggleHeart}
                  />
                  {walkwayDetail.likeCount}
                </S.ReactionButton>
                <S.RatingContainer>
                  <S.RatingGroup>
                    <StarCount rating={walkwayDetail.rating} size={14} />
                    <S.RatingScore>
                      {walkwayDetail.rating.toFixed(1)}
                    </S.RatingScore>
                    <span>리뷰 {walkwayDetail.reviewCount}개</span>
                  </S.RatingGroup>
                </S.RatingContainer>
                <S.ReactionButton
                  onClick={goToReviews}
                  style={{ cursor: "pointer" }}
                >
                  <MdArrowForwardIos />
                </S.ReactionButton>
              </S.LeftIcon>
              <S.BookmarkButton
                $isActive={walkwayDetail.marked}
                onClick={handleBookmarkClick}
              >
                {walkwayDetail.marked ? (
                  <BsBookmarkFill size={20} />
                ) : (
                  <BsBookmark size={20} />
                )}
              </S.BookmarkButton>
            </S.ReactionBar>
            <S.PathDescription>{walkwayDetail.memo}</S.PathDescription>
            {walkwayDetail.hashtags && walkwayDetail.hashtags.length > 0 && (
              <S.TagsContainer>
                {walkwayDetail.hashtags.map((hashtag) => (
                  <S.TagItem key={hashtag}>{hashtag}</S.TagItem>
                ))}
              </S.TagsContainer>
            )}
          </S.MapDetailsContainer>
        </S.MapSection>
        <S.ButtonContainer>
          <S.EditButton onClick={isMyPath ? handleEditClick : handleWalkClick}>
            {isMyPath ? "수정하기" : "이용하기"}
          </S.EditButton>

          {isMyPath && (
            <S.EditButton isDelete onClick={openDeleteModal}>
              삭제하기
            </S.EditButton>
          )}
          {walkwayHistory.canReview && (
            <S.ReviewButton onClick={handleReviewClick}>
              리뷰 작성하기
            </S.ReviewButton>
          )}
        </S.ButtonContainer>
      </S.PageWrapper>

      <BottomSheet
        isOpen={isOpen}
        onClose={toggleBottomSheet}
        height="50vh"
        minHeight="0px"
        showPreview={true}
        closeOnOutsideClick={true}
      >
        <div>
          <BookmarkSheet onComplete={() => toggleBottomSheet} />
        </div>
      </BottomSheet>

      <Modal
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
