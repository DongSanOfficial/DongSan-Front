import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface BottomSheetProps {
  isOpen: boolean;
  height?: string;
  initialHeight?: string;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
}

const SheetContainer = styled.div<{ isOpen: boolean; translateY: number; height?: string; initialHeight?: string; }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${props => props.height};  
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;
  transform: translateY(${props => 
    props.isOpen
      ? `${props.translateY}px`
      : `calc(100% - ${props.initialHeight} - ${props.translateY}px)`
  });
  z-index: 1000;
  overflow-y: auto;
`;

const DraggableArea = styled.div`
  height: 30px;
  width: 100%;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
`;

const Content = styled.div`
  padding: 0 20px 20px;
`;

export const BottomSheet: React.FC<BottomSheetProps> = ({ 
  isOpen, 
  onClose, 
  onOpen,
  children, 
  height = '80vh',  
  initialHeight = '30vh'
}) => {
  const [translateY, setTranslateY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const draggableAreaRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    const maxTranslateY = parseInt(height) - parseInt(initialHeight);
    
    if (isOpen) {
      if (diff >= -maxTranslateY && diff <= 0) {
        setTranslateY(maxTranslateY + diff);
      }
    } else {
      if (diff >= 0 && diff <= maxTranslateY) {
        setTranslateY(diff);
      }
    }
  }, [height, initialHeight, isDragging, startY, isOpen]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const maxTranslateY = parseInt(height) - parseInt(initialHeight);
    
    if (isOpen) {
      if (translateY < maxTranslateY / 2) {
        onClose();
      } else {
        setTranslateY(0);
      }
    } else {
      if (translateY > maxTranslateY / 2) {
        onOpen();
      } else {
        setTranslateY(0);
      }
    }
  }, [translateY, height, initialHeight, isOpen, onClose, onOpen]);

  useEffect(() => {
    if (isOpen) {
      setTranslateY(0);
    } else {
      setTranslateY(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const draggableArea = draggableAreaRef.current;
    if (draggableArea) {
      draggableArea.addEventListener('touchstart', handleTouchStart as any);
      draggableArea.addEventListener('touchmove', handleTouchMove as any);
      draggableArea.addEventListener('touchend', handleTouchEnd as any);

      return () => {
        draggableArea.removeEventListener('touchstart', handleTouchStart as any);
        draggableArea.removeEventListener('touchmove', handleTouchMove as any);
        draggableArea.removeEventListener('touchend', handleTouchEnd as any);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <SheetContainer
      isOpen={isOpen}
      height={height}
      initialHeight={initialHeight}
      translateY={translateY}
    >
      <DraggableArea ref={draggableAreaRef}>
        <Handle />
      </DraggableArea>
      <Content>{children}</Content>
    </SheetContainer>
  );
};