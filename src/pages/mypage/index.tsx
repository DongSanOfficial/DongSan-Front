import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ReactComponent as Favorite } from "../../assets/svg/Favorite.svg";
import { ReactComponent as BookMark } from "../../assets/svg/BookMark.svg";
import TrailCard from "src/components/TrailCard_mp";
import ReviewCard from "src/components/ReviewCard_mp";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../assets/svg/profile.svg";
import TrailBookmark from "../mypage/TrailBookmark";
import { getUserProfile } from "../../apis/auth";
import { UserProfileType } from "../../apis/auth.type";
import BottomNavigation from "src/components/bottomNavigation";
import AppBar from "src/components/appBar";
import { getMyWalkways } from "src/apis/walkway";
import { Trail } from "src/apis/walkway.type";

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
//프로필부분
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #054630;
  margin: 5px;
`;

const Img = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 50px;
  border: black 0.5px solid;
  margin: 15px;
  object-fit: cover;
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

const trailsBookmarks = [
  {
    icon: Favorite,
    path: "/mypage/TrailLikeList?type=favorites",
    title: "내가 좋아하는 산책로",
  },
  {
    icon: BookMark,
    path: "/mypage/TrailLikeList?type=bookmarks",
    title: "북마크 이름",
  },
  {
    icon: BookMark,
    path: "/mypage/TrailLikeList?type=bookmarks",
    title: "북마크 이름22",
  },
];

interface Review {
  id: number;
  trailName: string;
  date: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    trailName: "산책로1",
    date: "2024.09.25",
    content: "산책로가 이뻐요 8시쯤 가세요 근데 벌레 개많음 ㅜ",
    rating: 3,
  },
  {
    id: 2,
    trailName: "산책로2",
    date: "2024.09.26",
    content: "경치 좋고 산책하기 좋아요, 하지만 조심하세요.",
    rating: 4,
  },
];

function MyPage() {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [previewTrails, setPreviewTrails] = useState<Trail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [profile, walkwaysResponse] = await Promise.all([
          getUserProfile(),
          getMyWalkways({ preview: true }),
        ]);

        setUserProfile(profile);
        setPreviewTrails(walkwaysResponse.walkways);
        setError(null);
        console.log("프리뷰 산책로: ", walkwaysResponse.walkways);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = useCallback(
    (walkwayId: number) => {
      navigate(`/mypage/myregister/${walkwayId}`, {
        //프리뷰를 클릭해서 단건 조회 페이지로 이동했을 시,
        //단건 조회 페이지에서 백버튼 네이게이션은 다시 마이페이지로
        //하기 위해서 state 전달
        state: { from: 'mypage' }
      });
    },
    [navigate]
  );

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <AppBar onBack={() => navigate("/")} title="마이 페이지" />
      <Wrapper>
        <Profile>
          <Img
            src={userProfile?.profileImageUrl || profileImg}
            alt="프로필 이미지"
          />
          <div>
            <Name>{userProfile?.nickname || "이름"}</Name>
            <div>{userProfile?.email || "이메일 정보 없음"}</div>
          </div>
        </Profile>
        <Line />
        <div>
          <SeeAll>
            <Title>내가 등록한 산책로 보기</Title>
            <Button onClick={() => navigate("/mypage/TrailList")}>
              전체보기
            </Button>
          </SeeAll>
          <Items>
            {previewTrails.map((trail) => (
              <TrailCard key={trail.walkwayId} trail={trail} onClick={handleCardClick} />
            ))}
          </Items>
        </div>
        <Line />
        <Title>내가 "찜"한 산책로 조회</Title>
        {trailsBookmarks.map((trail, index) => (
          <TrailBookmark
            key={index}
            icon={trail.icon}
            path={trail.path}
            title={trail.title}
          />
        ))}
        <Line />
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
                key={review.id}
                trailName={review.trailName}
                date={review.date}
                content={review.content}
                rating={review.rating}
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
