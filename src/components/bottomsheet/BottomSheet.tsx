import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    children: React.ReactNode;
    height?: string;
    initialHeight?: string;
}

const SheetContainer = styled.div<{
    $isOpen: boolean;
    $height: string;
    $initialHeight: string;
    $translateY: number;
}>`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: ${props => props.$height};
    max-width: 430px;
    margin: 0 auto;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-out;
    transform: translateY(${props => 
        props.$isOpen 
            ? `${props.$translateY}px`
            : `calc(100% - ${props.$initialHeight} - ${props.$translateY}px)`
    });
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
    overflow-y: auto;
    background-color: white;
    height: calc(100% - 32px);
`;

export const BottomSheet = ({ 
    isOpen, 
    onClose, 
    onOpen, 
    children, 
    height = "85vh",
    initialHeight = "30vh"
}: BottomSheetProps ) => {
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

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        const maxHeight = getHeight(height.replace('vh', ''));
        const minHeight = getHeight(initialHeight.replace('vh', ''));
        const maxTranslate = maxHeight - minHeight;

        if (isOpen) {
            if (diff >= 0 && diff <= maxTranslate) {
                setTranslateY(diff);
            }
        } else {
            if (diff <= 0 && Math.abs(diff) <= maxTranslate) {
                setTranslateY(Math.abs(diff));
            }
        }
    }, [height, initialHeight, isDragging, startY, isOpen]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
        const maxHeight = getHeight(height.replace('vh', ''));
        const minHeight = getHeight(initialHeight.replace('vh', ''));
        const maxTranslate = maxHeight - minHeight;
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
    }, [translateY, height, initialHeight, isOpen, onClose, onOpen]);

    useEffect(() => {
        setTranslateY(0);
    }, [isOpen]);

    return (
        <SheetContainer
            ref={sheetRef}
            $isOpen={isOpen}
            $height={height}
            $initialHeight={initialHeight}
            $translateY={translateY}
        >
            <DraggableArea
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Handle />
            </DraggableArea>
            <Content>
                {children}
            </Content>
        </SheetContainer>
    );
};