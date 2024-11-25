import React, { Children, Component } from "react";
import Main from "../pages/main/index";
import MyPage from "../pages/mypage/index";
import TrailListPage from "../pages/mypage/TrailListPage";
import TrailLikeListPage from "../pages/mypage/TrailListLikePage";
import NewWay from "../pages/newway/index";
import SignIn from "../pages/signin/index";
import SignUp from "../pages/signup/index";
import Registration from "../pages/newway/registration";

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
    headerOptions: { title: `내가 좋아하는 산책로`, showBackButton: true },
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
    path: "/signup",
    component: SignUp,
    headerOptions: { headerShown: false },
  },
];

export default routes;
