import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string | number;
  minHeight?: string | number;
  showPreview?: boolean;
  closeOnOutsideClick?: boolean;
  showHeader?: boolean;
  title?: string;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  touch-action: none;
`;

const Container = styled.div<{
  isOpen: boolean;
  height: string | number;
  minHeight: string | number;
  showPreview: boolean;
}>`
  width: 100%;
  margin: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
  background-color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen, minHeight, showPreview }) =>
    isOpen
      ? "translateY(0)"
      : showPreview
      ? `translateY(calc(100% - ${
          typeof minHeight === "number" ? `${minHeight}px` : minHeight
        }))`
      : "translateY(100%)"};
  transition: transform 0.3s ease;
  z-index: 1001;
  overflow-y: auto;
  touch-action: none;

  /* 모바일 환경 */
  @media screen and (max-width: 767px) {
    max-width: 430px;
  }

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 100%;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0 16px;
  touch-action: none;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    padding: 20px 24px 0 24px;
  }
`;

const DragIndicator = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  margin: 0 auto 10px;
  cursor: pointer;
  touch-action: none;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    width: 50px;
    height: 5px;
    margin: 0 auto 12px;
  }
`;

const Content = styled.div`
  padding: 16px;
  overflow-y: auto;
  height: calc(100% - 32px);
  touch-action: auto;

  /* 태블릿 환경 */
  @media screen and (min-width: 768px) {
    padding: 20px 24px;
    height: calc(100% - 40px);
  }
`;

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  height = "80vh",
  minHeight = "150px",
  showPreview = true,
  closeOnOutsideClick = true,
  showHeader = true,
  title,
}: BottomSheetProps) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const resetPosition = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transition = "transform 0.3s ease";
      bottomSheetRef.current.style.transform = isOpen
        ? "translateY(0)"
        : showPreview
        ? `translateY(calc(100% - ${
            typeof minHeight === "number" ? `${minHeight}px` : minHeight
          }))`
        : "translateY(100%)";
    }
  };

  useEffect(() => {
    if (!isDragging) {
      resetPosition();
    }
  }, [isOpen, isDragging, minHeight, showPreview]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && e.target === e.currentTarget && isOpen) {
      onClose();
    }
  };

  const handleHeaderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transition = "none";
    }
    e.stopPropagation();
  };

  const handleHeaderTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (isOpen && diff > 0 && bottomSheetRef.current) {
      bottomSheetRef.current.style.transform = `translateY(${diff}px)`;
    } else if (!isOpen && diff < 0 && bottomSheetRef.current) {
      const currentminHeight =
        typeof minHeight === "number" ? minHeight : parseInt(minHeight);
      const translateY = `calc(100% - ${currentminHeight}px - ${Math.abs(
        diff
      )}px)`;
      bottomSheetRef.current.style.transform = translateY;
    }
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(false);

    const diff = currentY.current - startY.current;
    const threshold = 30;

    if (isOpen && diff > threshold) {
      onClose();
    } else if (!isOpen && diff < -threshold) {
      onClose();
    } else {
      resetPosition();
    }
  };

  const handleDragIndicatorClick = () => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleContentTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // 마우스 이벤트 추가 (태블릿, 데스크톱 환경)
  const handleHeaderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startY.current = e.clientY;
    setIsDragging(true);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.style.transition = "none";
    }
    e.stopPropagation();

    // 마우스 이벤트 리스너 추가
    document.addEventListener("mousemove", handleHeaderMouseMove);
    document.addEventListener("mouseup", handleHeaderMouseUp);
  };

  const handleHeaderMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    currentY.current = e.clientY;
    const diff = currentY.current - startY.current;

    if (isOpen && diff > 0 && bottomSheetRef.current) {
      bottomSheetRef.current.style.transform = `translateY(${diff}px)`;
    } else if (!isOpen && diff < 0 && bottomSheetRef.current) {
      const currentminHeight =
        typeof minHeight === "number" ? minHeight : parseInt(minHeight);
      const translateY = `calc(100% - ${currentminHeight}px - ${Math.abs(
        diff
      )}px)`;
      bottomSheetRef.current.style.transform = translateY;
    }
  };

  const handleHeaderMouseUp = (e: MouseEvent) => {
    setIsDragging(false);

    // 마우스 이벤트 리스너 제거
    document.removeEventListener("mousemove", handleHeaderMouseMove);
    document.removeEventListener("mouseup", handleHeaderMouseUp);

    const diff = currentY.current - startY.current;
    const threshold = 30;

    if (isOpen && diff > threshold) {
      onClose();
    } else if (!isOpen && diff < -threshold) {
      onClose();
    } else {
      resetPosition();
    }
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={handleOutsideClick} />
      <Container
        ref={bottomSheetRef}
        isOpen={isOpen}
        height={height}
        minHeight={minHeight}
        showPreview={showPreview}
      >
        {showHeader && (
          <Header
            ref={headerRef}
            onTouchStart={handleHeaderTouchStart}
            onTouchMove={handleHeaderTouchMove}
            onTouchEnd={handleHeaderTouchEnd}
            onMouseDown={handleHeaderMouseDown}
          >
            <DragIndicator onClick={handleDragIndicatorClick} />
            {title && (
              <div style={{ textAlign: "center", width: "100%" }}>{title}</div>
            )}
          </Header>
        )}
        <Content ref={contentRef} onTouchStart={handleContentTouchStart}>
          {children}
        </Content>
      </Container>
    </>
  );
};

export default BottomSheet;
