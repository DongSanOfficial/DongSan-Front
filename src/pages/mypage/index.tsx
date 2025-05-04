import React, { useState, useEffect, useCallback } from "react";
import S from "./mypage.styles";
import { ReactComponent as Favorite } from "../../assets/svg/Favorite.svg";
import { ReactComponent as BookMark } from "../../assets/svg/BookMark.svg";
import TrailCard from "src/components/card/TrailCard";
import ReviewCard from "src/components/card/ReviewCard";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../assets/images/profile.png";
import { getUserProfile, updateUserNickname } from "../../apis/auth/auth";
import { UserProfileType } from "../../apis/auth/auth.type";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { getMyWalkways } from "src/apis/walkway/walkway";
import { Trail } from "src/apis/walkway/walkway.type";
import instance from "src/apis/instance";
import { useToast } from "src/context/toast/useToast";
import { UserReviewsType, walkwayHistoryType } from "src/apis/review/review.type";
import { getReviewRecord, getUserReviews } from "src/apis/review/review";
import HistoryCard from "src/components/card/HistoryCard";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import { getBookmarkTitle } from "../../apis/bookmark/bookmark";
import Modal from "src/components/modal/Modal";
import { ReactComponent as Logout } from "../../assets/svg/Logout.svg";
import TrailBookmark from "./components/bookmark/TrailBookmark";

interface Bookmark {
  bookmarkId: number;
  title: string;
  marked?: boolean;
}

function MyPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [previewTrails, setPreviewTrails] = useState<Trail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<UserReviewsType[]>([]);
  const [previewHistory, setPreviewHistory] = useState<walkwayHistoryType[]>(
    []
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [refreshBookmarks, setRefreshBookmarks] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBookmarkId, setLastBookmarkId] = useState<number | null>(null);
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(false);
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [editedNickname, setEditedNickname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [profile, walkwaysResponse, historyReview, userReviews] =
          await Promise.all([
            getUserProfile(),
            getMyWalkways({ preview: true }),
            getReviewRecord({ size: 3 }),
            getUserReviews({ size: 3 }),
          ]);
        setUserProfile(profile);
        setPreviewTrails(walkwaysResponse.data);
        setPreviewHistory(historyReview.data ?? []);
        setReviews(userReviews.data || []);

        await fetchBookmarks();

        setError(null);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
        setPreviewHistory([]);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchBookmarks = async (reset: boolean = true) => {
    try {
      if (loadingBookmarks) return;

      setLoadingBookmarks(true);
      const response = await getBookmarkTitle({
        lastId: reset ? null : lastBookmarkId,
        size: 10,
      });

      console.log("북마크 조회 결과:", response);
      setBookmarks((prev) =>
        reset ? response.data || [] : [...prev, ...(response.data || [])]
      );
      setHasMoreBookmarks(response.hasNext);

      if (response.data && response.data.length > 0) {
        const newLastId = response.data[response.data.length - 1]?.bookmarkId;
        setLastBookmarkId(newLastId);
      }
    } catch (error) {
      console.error("북마크 조회 에러:", error);
      if (reset) {
        setBookmarks([]);
      }
    } finally {
      setLoadingBookmarks(false);
    }
  };

  useEffect(() => {
    if (refreshBookmarks > 0) {
      fetchBookmarks();
    }
  }, [refreshBookmarks]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      hasMoreBookmarks &&
      !loadingBookmarks
    ) {
      fetchBookmarks(false); // 추가 데이터 로드
    }
  };

  const handleBookmarkUpdate = useCallback(() => {
    setRefreshBookmarks((prev) => prev + 1);
  }, []);

  const handleBookmarkClick = useCallback(
    (bookmarkId: number) => {
      navigate(`/mypage/TrailList?type=bookmarks&bookmarkId=${bookmarkId}`);
    },
    [navigate]
  );

  const handleCardClick = useCallback(
    (walkwayId: number) => {
      navigate(`/mypage/myregister/${walkwayId}`, {
        state: { from: "mypage" },
      });
    },
    [navigate]
  );

  const handleHistoryClick = useCallback(
    (walkwayHistory: walkwayHistoryType) => {
      navigate(`/main/review/${walkwayHistory.walkwayId}`, {
        state: { walkwayHistoryId: walkwayHistory.walkwayHistoryId },
      });
    },
    [navigate]
  );

  const handleReviewClick = useCallback(
    (walkwayId: number) => {
      navigate(`/main/recommend/detail/${walkwayId}`, {
        state: { from: "mypage" },
      });
    },
    [navigate]
  );

  const handleLogout = async () => {
    try {
      await instance.delete("/auth/logout");
      showToast("로그아웃되었습니다!", "success");
      navigate("/signin");
    } catch (error) {
      showToast("로그아웃 중 문제가 발생했습니다.", "error");
    }
  };

  const handleOpenMoal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteAccount = async () => {
    try {
      await instance.delete("/auth/deactivate");
      navigate("/signin");
    } catch (error) {
      showToast("계정삭제 중 문제가 발생했습니다.", "error");
    }
    setIsModalOpen(false);
  };

  const handleEditNickname = () => {
    setIsEditingNickname(true);
    setEditedNickname(userProfile?.nickname || "");
  };

  const handleCancelEdit = () => {
    setIsEditingNickname(false);
    setEditedNickname("");
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 9 || value.length < editedNickname.length) {
      setEditedNickname(value);
    }
  };

  const handleSaveNickname = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserNickname(editedNickname);
      const updatedProfile = await getUserProfile();
      setUserProfile(updatedProfile);

      setIsEditingNickname(false);
      showToast("닉네임이 성공적으로 변경되었습니다!", "success");
    } catch (error) {
      showToast("닉네임 변경 중 문제가 발생했습니다.", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  const getTruncatedNickname = (nickname: string | undefined) => {
    if (!nickname) return "이름";
    return nickname.length > 9 ? `${nickname.slice(0, 9)}...` : nickname;
  };

  return (
    <>
      <AppBar
        onBack={() => navigate("/main")}
        title="마이 페이지"
        rightIcon={<Logout onClick={handleLogout} />}
      />
      <S.Wrapper onScroll={handleScroll}>
        <S.Profile>
          <S.ProfileTop>
            <S.ProfileInfo>
              <S.Img src={profileImg} alt="프로필 이미지" />
              <div>
                {isEditingNickname ? (
                  <S.NicknameForm onSubmit={handleSaveNickname}>
                    <S.NicknameInputWrapper>
                      <S.NicknameInput
                        type="text"
                        value={editedNickname}
                        onChange={handleNicknameChange}
                        maxLength={9}
                        placeholder="닉네임을 입력하세요"
                      />
                      <S.Counter>
                        {editedNickname.length}/9
                      </S.Counter>
                    </S.NicknameInputWrapper>
                    <S.SaveButton type="submit">저장</S.SaveButton>
                    <S.CancelButton type="button" onClick={handleCancelEdit}>
                      취소
                    </S.CancelButton>
                  </S.NicknameForm>
                ) : (
                  <S.NicknameContainer>
                    <S.Name title={userProfile?.nickname}>
                      {getTruncatedNickname(userProfile?.nickname)}
                    </S.Name>
                    <S.EditIcon onClick={handleEditNickname} />
                  </S.NicknameContainer>
                )}
                <S.Email>{userProfile?.email || "이메일 정보 없음"}</S.Email>
              </div>
            </S.ProfileInfo>
          </S.ProfileTop>
          <S.Line />
        </S.Profile>
        <div>
          <S.SeeAll>
            <S.Title>내가 등록한 산책로 보기</S.Title>
            <S.Button onClick={() => navigate("/mypage/TrailList")}>
              전체보기
            </S.Button>
          </S.SeeAll>
          <S.Items>
            {previewTrails.map((trail) => (
              <TrailCard
                key={trail.walkwayId}
                trail={trail}
                onClick={handleCardClick}
              />
            ))}
          </S.Items>
          <S.Line />
        </div>
        <div>
          <S.Title>내가 찜한 산책로 조회</S.Title>
          {/* 좋아하는 산책로 */}
          <TrailBookmark
            icon={Favorite}
            path="/mypage/TrailList?type=favorites"
            title="내가 좋아하는 산책로"
          />

          {bookmarks &&
            bookmarks.length > 0 &&
            bookmarks.map((bookmark) => (
              <TrailBookmark
                key={bookmark.bookmarkId}
                icon={BookMark}
                path={`/mypage/TrailList?type=bookmarks&bookmarkId=${bookmark.bookmarkId}`}
                title={bookmark.title || "이름 없는 북마크"}
                onClick={() => handleBookmarkClick(bookmark.bookmarkId)}
                bookmarkId={bookmark.bookmarkId}
                onUpdate={handleBookmarkUpdate}
              />
            ))}
          <S.Line />
        </div>
        <div>
          <S.SeeAll>
            <S.Title>산책로 리뷰작성하기</S.Title>
            <S.Button onClick={() => navigate("/mypage/ReviewableWalkway")}>
              전체보기
            </S.Button>
          </S.SeeAll>
          <S.Items>
            {previewHistory.map((data) => (
              <HistoryCard
                key={data.walkwayId}
                history={data}
                onClick={() => handleHistoryClick(data)}
              />
            ))}
          </S.Items>
          <S.Line />
        </div>
        <div>
          <S.SeeAll>
            <S.Title>내가 작성한 리뷰 모아보기</S.Title>
            <Link to="/mypage/ReviewList">
              <S.Button>전체보기</S.Button>
            </Link>
          </S.SeeAll>
          <S.Items>
            {reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                review={review}
                onClick={handleReviewClick}
              />
            ))}
          </S.Items>
        </div>
        <S.Unregister>
          <S.Delete onClick={handleOpenMoal}>탈퇴하기</S.Delete>
        </S.Unregister>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleDeleteAccount}
          message={
            "정말로 계정을 삭제하시겠습니까?\n삭제 후에는 복구가 불가능합니다."
          }
          cancelText="취소"
          confirmText="탈퇴"
          modalType="secession"
        />
      </S.Wrapper>
      <BottomNavigation />
    </>
  );
}

export default MyPage;