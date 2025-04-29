import styled from "styled-components";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div<{ width?: string; height?: string }>`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  width: ${({ width }) => width || "85%"};
  max-width: ${({ width }) => width || "400px"};
  height: ${({ height }) => height || "auto"};
  max-height: 90vh;
  overflow: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 35px;
    border-radius: 16px;
    max-width: ${({ width }) => width || "500px"};
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: ${({ width }) => width || "600px"};
    padding: 40px;
  }
`;

export default function Modal({
  isOpen,
  onClose,
  children,
  width,
  height,
}: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer width={width} height={height}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
}
