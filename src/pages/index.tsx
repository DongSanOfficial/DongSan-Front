import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavigationPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "로그인",
      routes: [{ route: "/signin", name: "소셜 로그인", headerShown: false }],
    },
    {
      title: "메인",
      routes: [{ route: "/main", name: "메인", headerShown: false }],
    },
    {
      title: "산책로 등록",
      routes: [
        { route: "/newway", name: "산책로 트래킹" },
        { route: "/newway/registration", name: "산책 후 등록하기" },
      ],
    },
    {
      title: "마이페이지",
      routes: [
        { route: "/mypage", name: "마이 페이지" },
        { route: "/mypage/TrailList", name: "내가 등록한 산책로 전체 리스트" },
        {
          route: "/mypage/TrailLikeList",
          name: "내가 좋아요한 산책로 전체 리스트",
        },
        { route: "/mypage/ReviewList", name: "내가 등록한 리뷰 리스트 보기" },
        {
          route: "/mypage/myregister",
          name: "내 산책로 상세 페이지 단건 조회",
        },
      ],
    },
    {
      title: "리뷰",
      routes: [
        { route: "/review/:walkwayId", name: "리뷰 작성하기" },
        { route: "/review/:walkwayId/content", name: "산책로 리뷰보기" },
      ],
    },
    {
      title: "산책로 이용",
      routes: [
        { route: "/usingtrail", name: "다른 유저가 등록한 산책로 이용하기" },
        {
          route: "/usingtrail/detail/:walkwayId",
          name: "다른 유저가 등록한 산책로 상세 페이지",
        },
      ],
    },
  ];

  return (
    <Navigation>
      <Title>네비게이션</Title>
      {categories.map((category, categoryIndex) => (
        <CategorySection key={categoryIndex}>
          <CategoryTitle>{category.title}</CategoryTitle>
          {category.routes.map((item, index) => (
            <NavigationButton key={index} onClick={() => navigate(item.route)}>
              {item.name}
              <Route>({item.route})</Route>
            </NavigationButton>
          ))}
        </CategorySection>
      ))}
    </Navigation>
  );
};

const Navigation = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
`;

const CategorySection = styled.div`
  padding: 15px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid #e0e0e0;
`;

const NavigationButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  border: none;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-1px);
  }
`;

const Route = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 8px;
`;

export default NavigationPage;
