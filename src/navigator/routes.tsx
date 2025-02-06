import Main from "../pages/main";
import MyPage from "../pages/mypage";
import TrailListPage from "../pages/mypage/TrailListPage";
import TrailLikeListPage from "../pages/mypage/TrailListLikePage";
import SignIn from "../pages/signin";
import Registration from "../pages/newway/registration";
import ReviewPage from "../pages/review";
import Usingtrail from "../pages/usingtrail";
import DetailUsing from "../pages/usingtrail/detail_using";
import TrailReviewPage from "../pages/mypage/TrailReviewPage";
import NavigationPage from "../pages";
import ReviewCheck from "../pages/review/ReviewCheck";
import PathDetails from "../pages/detail";
import NewWay from "../pages/newway";

interface RouteConfig {
 path: string;
 component: React.ComponentType<any>;
}

const routes: RouteConfig[] = [
 {
   path: "/",
   component: NavigationPage,
 },
 {
   path: "/main",
   component: Main,
 },
 {
   path: "/mypage",
   component: MyPage,
 },
 {
   path: "/mypage/TrailList",
   component: TrailListPage,
 },
// 내 산책로 > 단건 조회 루트를 제외한 모든 디테일 페이지
 {
  path: "/main/recommend/detail/:walkwayId",
  component: () => <PathDetails />,
},
// 내 산책로 > 단건 조회 루트로 진입한 디테일 페이지
{
  path: "/mypage/myregister/:walkwayId",
  component: () => <PathDetails isMyPath={true} />,
},
 {
   path: "/mypage/TrailLikeList",
   component: TrailLikeListPage,
 },
 {
   path: "/mypage/ReviewList",
   component: TrailReviewPage,
 },
 {
  path: "/newway",
  component: NewWay,
},
 {
   path: "/newway/registration",
   component: Registration,
 },
 {
   path: "/signin",
   component: SignIn,
 },
 {
   path: "/main/review/:walkwayId/content",
   component: ReviewCheck,
 },
 {
   path: "/main/review/:walkwayId",
   component: ReviewPage,
 },
 {
   path: "/usingtrail",
   component: Usingtrail,
 },
 {
   path: "/main/usedtrail/detail/:walkwayId",
   component: DetailUsing,
 }
];

export default routes;