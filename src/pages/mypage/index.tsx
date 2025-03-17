import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ReactComponent as Favorite } from "../../assets/svg/Favorite.svg";
import { ReactComponent as BookMark } from "../../assets/svg/BookMark.svg";
import TrailCard from "src/components/TrailCard_mp";
import ReviewCard from "src/components/ReviewCard_mp";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../assets/images/profile.png";
import TrailBookmark from "../mypage/TrailBookmark";
import { getUserProfile } from "../../apis/auth";
import { UserProfileType } from "../../apis/auth.type";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { getMyWalkways } from "src/apis/walkway";
import { Trail } from "src/apis/walkway.type";
import instance from "src/apis/instance";
import { theme } from "src/styles/colors/theme";
import { useToast } from "src/hooks/useToast";
import { UserReviewsType, walkwayHistoryType } from "src/apis/review.type";
import { getReviewRecord, getUserReviews } from "src/apis/review";
import HistoryCard from "src/components/HistoryCard_mp";
import LoadingSpinner from "src/components/loading/LoadingSpinner";
import { getBookmark } from "../../apis/bookmark";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  overflow: scroll;
  height: calc(100dvh - 126px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Line = styled.div`
  align-items: center;
  width: 95%;
  height: 1px;
  background-color: #cdcdcd;
  margin: 12px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #054630;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid ${theme.White};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  object-fit: cover;
`;

const LogoutButton = styled.button`
  padding: 6px;
  background-color: ${theme.White};
  color: ${theme.Green500};
  border: 1px solid ${theme.Green700};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

//내가 등록한 산책로
const SeeAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin: 10px 25px;
`;

const Button = styled.span`
  font-size: 10px;
  margin: 10px 25px;
`;

const Items = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 10px 5px 10px 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// API 응답 타입에 맞게 Bookmark 인터페이스 수정
interface Bookmark {
  bookmarkId: number; // id -> bookmarkId로 변경
  name: string;
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

  const fetchBookmarks = async () => {
    try {
      const defaultWalkwayId = 1;

      const response = await getBookmark({
        walkwayId: defaultWalkwayId,
        size: 10,
      });

      console.log("북마크 조회 결과:", response);
      setBookmarks(response.data || []);
    } catch (error) {
      console.error("북마크 조회 에러:", error);
      setBookmarks([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [profile, walkwaysResponse, historyReview, userReviews] = await Promise.all([
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

  useEffect(() => {
    if (refreshBookmarks > 0) {
      fetchBookmarks();
    }
  }, [refreshBookmarks]);

  const handleBookmarkUpdate = useCallback(() => {
    setRefreshBookmarks(prev => prev + 1);
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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <AppBar onBack={() => navigate("/main")} title="마이 페이지" />
      <Wrapper>
        <Profile>
          <ProfileTop>
            <ProfileInfo>
              <Img
                src={userProfile?.profileImageUrl || profileImg}
                alt="프로필 이미지"
              />
              <div>
                <Name>{userProfile?.nickname || "이름"}</Name>
                <div>{userProfile?.email || "이메일 정보 없음"}</div>
              </div>
            </ProfileInfo>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </ProfileTop>
          <Line />
        </Profile>

        <div>
          <SeeAll>
            <Title>내가 등록한 산책로 보기</Title>
            <Button onClick={() => navigate("/mypage/TrailList")}>
              전체보기
            </Button>
          </SeeAll>
          <Items>
            {previewTrails.map((trail) => (
              <TrailCard
                key={trail.walkwayId}
                trail={trail}
                onClick={handleCardClick}
              />
            ))}
          </Items>
          <Line />
        </div>
        <div>
          <Title>내가 찜한 산책로 조회</Title>
          {/* 좋아하는 산책로 */}
          <TrailBookmark
            icon={Favorite}
            path="/mypage/TrailList?type=favorites"
            title="내가 좋아하는 산책로"
          />

          {bookmarks && bookmarks.length > 0 && (
            bookmarks.map((bookmark) => (
              <TrailBookmark
                key={bookmark.bookmarkId}
                icon={BookMark}
                path={`/mypage/TrailList?type=bookmarks&bookmarkId=${bookmark.bookmarkId}`}
                title={bookmark.name || "이름 없는 북마크"}
                onClick={() => handleBookmarkClick(bookmark.bookmarkId)}
                bookmarkId={bookmark.bookmarkId}
                onUpdate={handleBookmarkUpdate}
              />
            ))
          )}
          <Line />
        </div>

        <div>
          <SeeAll>
            <Title>산책로 리뷰작성하기</Title>
            <Button onClick={() => navigate("/mypage/ReviewableWalkway")}>
              전체보기
            </Button>
          </SeeAll>
          <Items>
            {previewHistory.map((data) => (
              <HistoryCard
                key={data.walkwayId}
                history={data}
                onClick={() => handleHistoryClick(data)}
              />
            ))}
          </Items>
          <Line />
        </div>

        <div>
          <SeeAll>
            <Title>내가 작성한 리뷰 모아보기</Title>
            <Link to="/mypage/ReviewList">
              <Button>전체보기</Button>
            </Link>
          </SeeAll>
          <Items>
            {reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                review={review}
                onClick={handleReviewClick}
              />
            ))}
          </Items>
        </div>
      </Wrapper>
      <BottomNavigation />
    </>
  );
}

export default MyPage;