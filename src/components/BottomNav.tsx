import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as NewWay } from "../assets/svg/NewWay.svg";
import { ReactComponent as Home } from "../assets/svg/Home.svg";
import { ReactComponent as MyPage } from "../assets/svg/MyPage.svg";
import { theme } from '../styles/colors/theme';

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  max-width: 430px;
  margin: 0 auto;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 50px;
  max-width: 430px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const StyledSVG = styled.div<{ isActive: boolean }>`
  svg {
    width: 24px;
    height: 24px;
    path {
      fill: ${props => props.isActive ? theme.Green500 : 'currentColor'};
    }
  }
`;

const BottomNav = () => {
  const location = useLocation();

  const isPathActive = (basePath: string): boolean => {
    return location.pathname.startsWith(basePath);
  };

  return (
    <NavBar>
      <NavContent>
        <NavLink to="/newway/test">
          <StyledSVG isActive={isPathActive('/newway')}>
            <NewWay />
          </StyledSVG>
        </NavLink>

        <NavLink to="/main">
          <StyledSVG isActive={isPathActive('/main')}>
            <Home />
          </StyledSVG>
        </NavLink>

        <NavLink to="/mypage">
          <StyledSVG isActive={isPathActive('/mypage')}>
            <MyPage />
          </StyledSVG>
        </NavLink>
      </NavContent>
    </NavBar>
  );
};

export default BottomNav;