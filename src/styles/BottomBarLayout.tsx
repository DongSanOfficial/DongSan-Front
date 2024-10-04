import React from 'react';
import { useLocation, Location } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from '../components/BottomNav';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.main`
  flex-grow: 1;
  padding-bottom: 60px; 
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children } : LayoutProps) => {
  const location: Location = useLocation();
  const hideBottomNavPaths: string[] = ['/signin', '/signup', '/newway'];
  const showBottomNav: boolean = !hideBottomNavPaths.includes(location.pathname);

  return (
    <LayoutWrapper>
      <Main>{children}</Main>
      {showBottomNav && <BottomNav />}
    </LayoutWrapper>
  );
};

export default Layout;