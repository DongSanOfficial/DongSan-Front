import Main from "../pages/main";
import MyPage from "../pages/mypage";
import TrailListPage from "../pages/mypage/components/trailList/TrailListPage";
import SignIn from "../pages/signin";
import Registration from "../pages/register";
import ReviewPage from "../pages/review";
import PathDetails from "../pages/detail";
import SplashScreen from "src/pages/splash/components/SplashScreen";
import Splash from "src/pages/splash";
import NewWay from "../pages/newway";
import ReviewableHistory from "../pages/mypage/components/review/ReviewableHistory";
import Guide from "../pages/guide";
import TrailReviewPage from "src/pages/mypage/components/review/TrailReviewPage";
import ReviewCheck from "src/pages/review/components/ReviewCheck";
import Community from "src/pages/community";
import CreateCrew from "src/pages/community/create";
import SearchCrew from "src/pages/community/search";
import CrewDetail from "src/pages/community/detail";
import RankDetail from "src/pages/community/detail/summary/rank";
import DetailFeed from "src/pages/community/detail/together/detail";
import CrewInfo from "src/pages/community/info";
import CrewSetting from "src/pages/community/info/setting";
import ModifyCrew from "src/pages/community/modify";

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
  // 커뮤니티
  {
    path: "/community",
    component: Community,
  },
  {
    path: "/community/create",
    component: CreateCrew,
  },
  {
    path: "/community/modify",
    component: ModifyCrew,
  },
  {
    path: "/community/search",
    component: SearchCrew,
  },
  {
    path: "/community/detail",
    // path: "/community/detail/:crewId",
    component: CrewDetail,
  },
  {
    path: "/community/detail/information",
    component: CrewInfo,
  },
  {
    path: "/community/detail/crewSetting",
    component: CrewSetting,
  },
  {
    path: "/community/detail/:cowalkId",
    component: DetailFeed,
  },
  {
    path: "/community/detail/summary/rank",
    component: RankDetail,
  },
];

export default routes;
