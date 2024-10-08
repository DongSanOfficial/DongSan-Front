import React from 'react';
import { Link, useLocation, Location } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../assets/images/bottomNavBar/Home.png';
import HomeActiveIcon from '../assets/images/bottomNavBar/HomeActive.png';
import NewWayIcon from '../assets/images/bottomNavBar/NewWay.png';
import NewWayActiveIcon from '../assets/images/bottomNavBar/NewWayActive.png';
import MyPageIcon from '../assets/images/bottomNavBar/MyPage.png';
import MyPageActiveIcon from '../assets/images/bottomNavBar/MyPageActive.png';

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
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
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.img<IconProps>`
  width: 24px;
  height: 24px;
  user-select: none;
`;

interface IconProps {
  src: string;
  alt: string;
}

const BottomNav = () => {
  const location: Location = useLocation();

  return (
    <NavBar>
      <NavContent>
        <NavLink to="/newway">
          <Icon 
            src={location.pathname === '/newway' ? NewWayActiveIcon : NewWayIcon} 
            alt="New Way" 
          />
        </NavLink>

        <NavLink to="/">
          <Icon 
            src={location.pathname === '/' ? HomeActiveIcon : HomeIcon} 
            alt="Home" 
          />
        </NavLink>

        <NavLink to="/mypage">
          <Icon 
            src={location.pathname === '/mypage' ? MyPageActiveIcon : MyPageIcon} 
            alt="My Page" 
          />
        </NavLink>
      </NavContent>
    </NavBar>
  );
};

export default BottomNav;