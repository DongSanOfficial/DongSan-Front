import React from "react";
import { useLocation, Location } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../components/BottomNav";
import { PATHS_WITHOUT_NAVIGATION } from "../constants/develop.constants";

const LayoutWrapper = styled.div<{ hasBottomNav: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div<{ hasBottomNav: boolean }>`
  flex: 1;
  overflow-y: auto;
  ${props => props.hasBottomNav && `
    padding-bottom: 70px;  // 하단 네비게이션이 있을 때만 패딩 적용
  `}
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location: Location = useLocation();
  const hasBottomNav = !PATHS_WITHOUT_NAVIGATION.includes(location.pathname);

  return (
    <LayoutWrapper hasBottomNav={hasBottomNav}>
      <ContentWrapper hasBottomNav={hasBottomNav}>
        {children}
      </ContentWrapper>
      {hasBottomNav && <BottomNav />}
    </LayoutWrapper>
  );
};

export default Layout;
