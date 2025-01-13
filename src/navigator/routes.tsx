import Main from "../pages/main/index";
import MyPage from "../pages/mypage/index";
import TrailListPage from "../pages/mypage/TrailListPage";
import TrailLikeListPage from "../pages/mypage/TrailListLikePage";
import NewWay from "../pages/newway/index";
import SignIn from "../pages/signin/index";
import Registration from "../pages/newway/registration";
import MyRegister from "../components/myregister";
import ReviewPage from "../pages/review/index";
import Usingtrail from "../pages/usingtrail";
import DetailUsing from "../pages/usingtrail/detail_using";
import TrailReviewPage from "../pages/mypage/TrailReviewPage";
import NavigationPage from "../pages";
import ReviewCheck from "../pages/review/ReviewCheck";
import RecommendTrail from "../pages/detailpage/recommend_trail";
import TrailLiked from "../pages/detailpage/TrailLiked";

export const routes = [
  {
    path: "/",
    component: NavigationPage,
    headerOptions: { headerShown: false },
  },
  {
    path: "/main",
    component: Main,
    headerOptions: { headerShown: false },
  },
  {
    path: "/recommend/detail/:walkwayId",
    component: RecommendTrail,
    headerOptions: { title: "산책로", showBackButton: true },
  },
  {
    path: "/mypage",
    component: MyPage,
    headerOptions: { title: "마이 페이지", showBackButton: true },
  },
  {
    path: "/mypage/TrailList",
    component: TrailListPage,
    headerOptions: { title: "전체보기", showBackButton: true },
  },
  {
    path: "/mypage/myregister/:walkwayId",
    component: MyRegister,
    headerOptions: { title: "내 산책로", showBackButton: true },
  },
  {
    path: "/mypage/TrailLikeList",
    component: TrailLikeListPage,
    headerOptions: { showBackButton: true },
  },
  {
    path: "/mypage/ReviewList",
    component: TrailReviewPage,
    headerOptions: { title: "리뷰보기", showBackButton: true },
  },
  {
    path: "/mypage/TrailLikeList/detail/:walkwayId",
    component: TrailLiked,
    headerOptions: { title: "찜한 산책로", showBackButton: true },
  },
  {
    path: "/newway",
    component: NewWay,
    headerOptions: { title: "산책로 등록", showBackButton: true },
  },
  {
    path: "/newway/registration",
    component: Registration,
    headerOptions: { title: "산책로 등록", showBackButton: true },
  },
  {
    path: "/signin",
    component: SignIn,
    headerOptions: { headerShown: false },
  },
  {
    path: "/review/:walkwayId/content",
    component: ReviewCheck,
    headerOptions: { title: "산책로 리뷰", showBackButton: true },
  },
  {
    path: "/review/:walkwayId",
    component: ReviewPage,
    headerOptions: { title: "리뷰 작성하기", showBackButton: true },
  },
  {
    path: "/usingtrail",
    component: Usingtrail,
    headerOptions: { title: "산책로 이용하기", showBackButton: true },
  },
  {
    path: "/usedtrail/detail/:walkwayId",
    component: DetailUsing,
    headerOptions: { title: "산책로", showBackButton: true },
  },
];

export default routes;
