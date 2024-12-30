import React from "react";
import { useLocation, Location } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../components/BottomNav";

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location: Location = useLocation();
  const hideBottomNavPaths: string[] = [
    "/signin",
    "/signup",
    "/newway",
    "/usingtrail",
  ];
  const showBottomNav: boolean = !hideBottomNavPaths.includes(
    location.pathname
  );

  return (
    <LayoutWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      {showBottomNav && <BottomNav />}
    </LayoutWrapper>
  );
};

export default Layout;
