import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/index';
import MyPage from './pages/mypage/index';
import NewWay from './pages/newway/index';
import SignIn from './pages/signin/index';
import SignUp from './pages/signup/index';

export const routes = [
    { path: '/', element: <Main /> },
    { path: '/mypage', element: <MyPage /> },
    { path: '/newway', element: <NewWay /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> }
];

const RoutesSetting = () => (
    <Routes>
        {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
        ))}
    </Routes>
);
export default RoutesSetting;