import Main from "../pages/main";
import MyPage from "../pages/mypage";
import TrailListPage from "../pages/mypage/TrailListPage";
import TrailLikeListPage from "../pages/mypage/TrailListLikePage";
import NewWay from "../pages/newway";
import SignIn from "../pages/signin";
import Registration from "../pages/newway/registration";
import MyRegister from "../components/myregister";
import ReviewPage from "../pages/review";
import Usingtrail from "../pages/usingtrail";
import DetailUsing from "../pages/usingtrail/detail_using";
import TrailReviewPage from "../pages/mypage/TrailReviewPage";
import NavigationPage from "../pages";
import ReviewCheck from "../pages/review/ReviewCheck";
import RecommendTrail from "../pages/detailpage/recommend_trail";
import TrailLiked from "../pages/detailpage/TrailLiked";

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
   path: "/main/recommend/detail/:walkwayId",
   component: RecommendTrail,
 },
 {
   path: "/mypage",
   component: MyPage,
 },
 {
   path: "/mypage/TrailList",
   component: TrailListPage,
 },
 {
   path: "/mypage/myregister/:walkwayId",
   component: MyRegister,
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
   path: "/mypage/TrailLikeList/detail/:walkwayId",
   component: TrailLiked,
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