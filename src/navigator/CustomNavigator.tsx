import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { PATHS_WITHOUT_NAVIGATION } from '../constants/develop.constants';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  headerOptions?: {
    title?: string;
    showBackButton?: boolean;
    headerShown?: boolean;
  };
}

interface NavigatorProps {
  routes: RouteConfig[];
  initialRouteName: string;
}

const PageContainer = styled.div<{ hasHeader: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${props => !props.hasHeader && `
    padding-top: 0;  // 헤더가 없을 때는 상단 패딩 제거
  `}
`;

const Content = styled.div<{ hasHeader: boolean; hasBottomNav: boolean }>`
  flex: 1;
  overflow-y: auto;
  ${props => props.hasHeader && `
    padding-top: 56px;  // 헤더가 있을 때만 상단 패딩 적용
  `}
  ${props => props.hasBottomNav && `
    padding-bottom: 70px;  // 하단 네비게이션이 있을 때만 하단 패딩 적용
  `}
`;


const CustomNavigator = ({ routes }: NavigatorProps) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PageWrapper
              component={route.component}
              headerOptions={route.headerOptions}
            />
          }
        />
      ))}
    </Routes>
  );
};

interface PageWrapperProps {
  component: React.ComponentType<any>;
  headerOptions?: RouteConfig['headerOptions'];
}

const PageWrapper = ({ component: Component, headerOptions }: PageWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const hasHeader = headerOptions?.headerShown !== false;
  const hasBottomNav = !PATHS_WITHOUT_NAVIGATION.includes(location.pathname);

  return (
    <PageContainer hasHeader={hasHeader}>
      {hasHeader && (
        <Header
          title={headerOptions?.title}
          showBackButton={headerOptions?.showBackButton}
          onBack={() => navigate(-1)}
        />
      )}
      <Content hasHeader={hasHeader} hasBottomNav={hasBottomNav}>
        <Component />
      </Content>
    </PageContainer>
  );
};


export default CustomNavigator;