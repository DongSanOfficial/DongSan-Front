import Main from "../pages/main";
import MyPage from "../pages/mypage";
import TrailListPage from "../pages/mypage/trailList/TrailListPage";
import SignIn from "../pages/signin";
import Registration from "../pages/newway/registration";
import ReviewPage from "../pages/review";
import NavigationPage from "../pages";
import ReviewCheck from "../pages/review/ReviewCheck";
import PathDetails from "../pages/detail";
import SplashScreen from "src/components/SplashScreen";
import Splash from "src/pages/splash";
import NewWay from "../pages/newway";
import ReviewableHistory from "../pages/mypage/review/ReviewableHistory";
import Guide from "../pages/guide";
import LocationAcceptance from "../pages/error/locationAcceptance";
import TrailReviewPage from "src/pages/mypage/review/TrailReviewPage";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Splash,
  },
  {
    path: "/navigation",
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
  {
    path: "/splash",
    component: SplashScreen,
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
    path: "/mypage/ReviewableWalkway",
    component: ReviewableHistory,
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
    path: "/guide",
    component: Guide,
  },
  {
    path: "/locationAcceptance",
    component: LocationAcceptance,
  }
];

export default routes;
