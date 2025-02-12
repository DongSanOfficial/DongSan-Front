import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import {
  BiWalk,
  BiSearch,
  BiUser,
  BiMapAlt,
  BiInfoCircle,
} from "react-icons/bi";

import WalkingMethodSection from "./sections/WalkingMethodSection";
import RegisterSection from "./sections/RegisterSection";
import SearchSection from "./sections/SearchSection";
import MyPageSection from "./sections/MyPageSection";
import AppBar from "src/components/appBar";
import FollowGuideSection from "./sections/FollowGuideSection";

interface NavButtonProps {
  $active: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 56px);
  overflow: auto;
  background-color: ${(props) => props.theme.Gray50};
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IntroSection = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.Gray200};
`;

const IntroTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${(props) => props.theme.Green700};
`;

const IntroText = styled.p`
  color: ${(props) => props.theme.Gray700};
  line-height: 1.7;
  font-size: 15px;
`;

const NavContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

const NavWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 16px;
  gap: 12px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButton = styled.button<NavButtonProps>`
  white-space: nowrap;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.$active ? props.theme.Green100 : props.theme.Gray100};
  color: ${(props) =>
    props.$active ? props.theme.Green700 : props.theme.Gray700};
  border: 1px solid
    ${(props) => (props.$active ? props.theme.Green200 : props.theme.Gray200)};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.$active ? props.theme.Green50 : props.theme.Gray50};
    transform: translateY(-1px);
  }

  svg {
    font-size: 18px;
  }
`;

const ContentContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;

  > div {
    scroll-margin-top: 120px;
  }
`;

export default function Guide() {
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("walkingGuide");

  const { ref: registerRef, inView: registerInView } = useInView({
    threshold: 0.3,
  });

  const { ref: searchRef, inView: searchInView } = useInView({
    threshold: 0.3,
  });

  const { ref: useGuideRef, inView: useGuideInView } = useInView({
    threshold: 0.3,
  });

  const { ref: mypageRef, inView: mypageInView } = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    if (registerInView) setActiveSection("register");
    else if (searchInView) setActiveSection("search");
    else if (useGuideInView) setActiveSection("useGuide");
    else if (mypageInView) setActiveSection("mypage");
  }, [registerInView, searchInView, useGuideInView, mypageInView]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-ref="${sectionId}"]`);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const activeButton = document.querySelector(
      `[data-section="${activeSection}"]`
    );
    if (activeButton && navRef.current) {
      const container = navRef.current;
      const scrollLeft =
        activeButton.getBoundingClientRect().left +
        container.scrollLeft -
        container.getBoundingClientRect().left -
        (container.offsetWidth - (activeButton as HTMLElement).offsetWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <>
      <AppBar onBack={() => navigate("/main")} title="동산 가이드" />
      <Wrapper>
        <IntroSection>
          <IntroTitle>
            <BiInfoCircle size={24} />
            동산 소개
          </IntroTitle>
          <IntroText>
            안녕하세요! 동산은 자신만의 산책 경로를 생성하고 공유할 수 있는
            서비스입니다. 동산과 함께 일상적인 산책을 더욱 즐겁고 의미있게
            만들어보세요~!
          </IntroText>
        </IntroSection>

        <NavContainer>
          <NavWrapper ref={navRef}>
            <NavButton
              $active={activeSection === "register"}
              onClick={() => scrollToSection("register")}
              data-section="register"
            >
              <BiMapAlt />
              산책 및 산책로 등록
            </NavButton>
            <NavButton
              $active={activeSection === "search"}
              onClick={() => scrollToSection("search")}
              data-section="search"
            >
              <BiSearch />
              산책로 검색
            </NavButton>
            <NavButton
              $active={activeSection === "useGuide"}
              onClick={() => scrollToSection("useGuide")}
              data-section="useGuide"
            >
              <BiWalk />
              산책로 이용
            </NavButton>
            <NavButton
              $active={activeSection === "mypage"}
              onClick={() => scrollToSection("mypage")}
              data-section="mypage"
            >
              <BiUser />
              마이페이지
            </NavButton>
          </NavWrapper>
        </NavContainer>

        <ContentContainer>
          <div>
            <WalkingMethodSection />
          </div>
          <div ref={registerRef} data-ref="register">
            <RegisterSection />
          </div>
          <div ref={searchRef} data-ref="search">
            <SearchSection />
          </div>
          <div ref={useGuideRef} data-ref="useGuide">
            <FollowGuideSection />
          </div>
          <div ref={mypageRef} data-ref="mypage">
            <MyPageSection />
          </div>
        </ContentContainer>
      </Wrapper>
    </>
  );
}
