import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div<{ width?: string; height?: string }>`
  background-color: white;
  border-radius: 16px;
  padding: 30px;
  width: ${({ width }) => width || "85%"};
  max-width: ${({ width }) => width || "400px"};
  height: ${({ height }) => height || "auto"};
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Modal = ({ isOpen, onClose, children, width, height }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer width={width} height={height}>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
