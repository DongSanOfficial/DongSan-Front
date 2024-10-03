import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const CustomNavigator = ({ routes, initialRouteName }: NavigatorProps) => {
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

  return (
    <PageContainer>
      {headerOptions?.headerShown !== false && (
        <Header
          title={headerOptions?.title}
          showBackButton={headerOptions?.showBackButton}
          onBack={() => navigate(-1)}
        />
      )}
      <Content>
        <Component />
      </Content>
    </PageContainer>
  );
};

export default CustomNavigator;