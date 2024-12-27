import Main from "../pages/main/index";
import MyPage from "../pages/mypage/index";
import TrailListPage from "../pages/mypage/TrailListPage";
import TrailLikeListPage from "../pages/mypage/TrailListLikePage";
import NewWay from "../pages/newway/index";
import SignIn from "../pages/signin/index";
import Registration from "../pages/newway/registration";
import MyRegister from "../components/myregister";
import ReviewPage from "../pages/review/index";

export const routes = [
  {
    path: "/",
    component: Main,
    headerOptions: { headerShown: false },
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
    path: "/mypage/TrailLikeList",
    component: TrailLikeListPage,
    headerOptions: { showBackButton: true },
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
    path: "/mypage/myregister",
    component: MyRegister,
    headerOptions: { title: "내 산책로", showBackButton: true },
  },
  {
    path: "/review/:walkwayId",
    component: ReviewPage,
    headerOptions: { title: "리뷰 작성하기", showBackButton: true },
  },
];

export default routes;
