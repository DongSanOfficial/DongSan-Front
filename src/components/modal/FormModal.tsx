// components/common/FormModal.tsx
import S from "./modal.styles"; // 이게 포인트입니다!
import { ReactNode } from "react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function FormModal({
  isOpen,
  onClose,
  children,
}: FormModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <S.ModalContainer>{children}</S.ModalContainer>
    </S.ModalOverlay>
  );
}
