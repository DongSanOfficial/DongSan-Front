import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  maxHeight?: string;
  minHeight?: string;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
  z-index: 9;
  max-width: 430px;
`;

const SheetContainer = styled.div<{
  $isOpen: boolean;
  $maxHeight: string;
  $minHeight: string;
  $translateY: number;
}>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${(props) => props.$maxHeight};
  max-width: 430px;
  margin: 0 auto;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;
  transform: translateY(
    ${(props) =>
      props.$isOpen
        ? `${props.$translateY}px`
        : `calc(100% - ${props.$minHeight})`}
  );
  z-index: 10;
  touch-action: none;
`;

const DraggableArea = styled.div`
  height: 32px;
  width: 100%;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
`;

const Content = styled.div`
  padding: 0 20px 20px;
  overflow: scroll;
  background-color: white;
  height: calc(100% - 32px);
`;

export const BottomSheetStorage = ({
  isOpen,
  onClose,
  onOpen,
  children,
  maxHeight = "85vh",
  minHeight = "0vh",
}: BottomSheetProps) => {
  const [translateY, setTranslateY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const getHeight = (vh: string) => {
    return (window.innerHeight * parseInt(vh)) / 100;
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      const maxSheetHeight = getHeight(maxHeight.replace("vh", ""));
      const minSheetHeight = getHeight(minHeight.replace("vh", ""));
      const maxTranslate = maxSheetHeight - minSheetHeight;

      if (isOpen) {
        if (diff >= 0 && diff <= maxTranslate) {
          setTranslateY(diff);
        }
      } else {
        if (diff <= 0 && Math.abs(diff) <= maxTranslate) {
          setTranslateY(Math.abs(diff));
        }
      }
    },
    [maxHeight, minHeight, isDragging, startY, isOpen]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const maxSheetHeight = getHeight(maxHeight.replace("vh", ""));
    const minSheetHeight = getHeight(minHeight.replace("vh", ""));
    const maxTranslate = maxSheetHeight - minSheetHeight;
    const threshold = maxTranslate / 2;

    if (isOpen) {
      if (translateY > threshold) {
        onClose();
      } else {
        setTranslateY(0);
      }
    } else {
      if (translateY > threshold) {
        onOpen();
      } else {
        setTranslateY(0);
      }
    }
  }, [translateY, maxHeight, minHeight, isOpen, onClose, onOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    setTranslateY(0);
  }, [isOpen]);

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <SheetContainer
        ref={sheetRef}
        $isOpen={isOpen}
        $maxHeight={maxHeight}
        $minHeight={minHeight}
        $translateY={translateY}
      >
        <DraggableArea
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Handle />
        </DraggableArea>
        <Content>{children}</Content>
      </SheetContainer>
    </>
  );
};
