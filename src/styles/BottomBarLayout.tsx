import React from 'react';
import { useLocation, Location } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from '../components/BottomNav';

const LayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
      {children}
      {showBottomNav && <BottomNav />}
    </LayoutWrapper>
  );
};

export default Layout;