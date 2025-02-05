import { theme } from "src/styles/colors/theme";
import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

const drawPath = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounceIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.White};
  height: 100dvh;
`;

const SvgContainer = styled.div`
  position: relative;
  width: 16rem;
  height: 16rem;
`;

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const WalkingPath = styled.path<{ dashLength: number }>`
  stroke-dasharray: ${(props) => props.dashLength};
  stroke-dashoffset: ${(props) => props.dashLength};
  animation: ${drawPath} 2s ease-out forwards;
`;

const FootprintDot = styled.circle<{ delay: number }>`
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;
`;

const MarkerIcon = styled.g`
  transform-origin: 10px 50px;
  animation: ${bounceIn} 0.5s ease-out forwards;
`;

const Title = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.Black};
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.5s;
  white-space: nowrap;
`;

const PATH_LENGTH = 200;

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pathRef = useRef<SVGPathElement>(null);
  const [dashLength, setDashLength] = useState(PATH_LENGTH);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setDashLength(length);
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <Container>
      <SvgContainer>
        <StyledSVG viewBox="0 0 100 100">
          {/* 산책로 경로 */}
          <WalkingPath
            ref={pathRef}
            d="M10,50 C20,40 30,60 40,50 C50,40 60,60 70,50 C80,40 90,60 90,50"
            fill="none"
            stroke={theme.Green300}
            strokeWidth="2"
            dashLength={dashLength}
          />

          {/* 지도 마커 */}
          <MarkerIcon>
            <path
              d="M10,42 C10,37 14,33 18,33 C22,33 26,37 26,42 C26,47 18,50 18,50 C18,50 10,47 10,42 Z"
              fill="#ef4444"
            />
            <circle cx="18" cy="42" r="2" fill="white" />
          </MarkerIcon>

          {/* 발자국 점들 */}
          <FootprintDot
            cx="40"
            cy="50"
            r="1.5"
            fill={theme.Green300}
            delay={0.6}
          />
          <FootprintDot
            cx="70"
            cy="50"
            r="1.5"
            fill={theme.Green300}
            delay={1.2}
          />
          <FootprintDot
            cx="90"
            cy="50"
            r="1.5"
            fill={theme.Green300}
            delay={1.8}
          />
        </StyledSVG>
        <Title>동산과 함께 산책해요</Title>
      </SvgContainer>
    </Container>
  );
};

export default SplashScreen;
