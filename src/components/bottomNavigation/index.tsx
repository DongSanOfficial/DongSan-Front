import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as NewWay } from "../../assets/svg/NewWay.svg";
import { ReactComponent as Home } from "../../assets/svg/Home.svg";
import { ReactComponent as MyPage } from "../../assets/svg/MyPage.svg";
import { theme } from "src/styles/colors/theme";
import { useLocationStore } from "../../store/useLocationStore";
import ConfirmationModal from "../modal/ConfirmationModal";

const NavigationBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.05);
  z-index: 1003;
  width: 100%;
  margin: 0 auto;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    max-width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 50px;
  width: 100%;
  margin: 0 auto;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    height: 80px;
    padding: 0 100px;
  }
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
      fill: ${(props) => (props.isActive ? theme.Green500 : "currentColor")};
    }
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCurrentLocation } = useLocationStore();
  const [isLocationAccessModalOpen, setIsLocationAccessModalOpen] =
    useState(false);

  const isPathActive = (basePath: string): boolean => {
    return location.pathname.startsWith(basePath);
  };

  const handleNewWayClick = async () => {
    try {
      await getCurrentLocation();
      navigate("/newway");
    } catch (error) {
      setIsLocationAccessModalOpen(true);
    }
  };

  return (
    <>
      <NavigationBar>
        <NavContent>
          <div onClick={handleNewWayClick} style={{ cursor: "pointer" }}>
            <StyledSVG isActive={isPathActive("/newway")}>
              <NewWay />
            </StyledSVG>
          </div>
          <NavLink to="/main">
            <StyledSVG isActive={isPathActive("/main")}>
              <Home />
            </StyledSVG>
          </NavLink>

          <NavLink to="/mypage">
            <StyledSVG isActive={isPathActive("/mypage")}>
              <MyPage />
            </StyledSVG>
          </NavLink>
        </NavContent>
      </NavigationBar>

      <ConfirmationModal
        isOpen={isLocationAccessModalOpen}
        onClose={() => setIsLocationAccessModalOpen(false)}
        onConfirm={() => setIsLocationAccessModalOpen(false)}
        message="디바이스의 위치 접근을 수락해주세요. 
현재 위치를 가져오려면 위치 접근 권한이 필요합니다."
        modalType="location"
        confirmText="확인"
      />
    </>
  );
};

export default BottomNavigation;
