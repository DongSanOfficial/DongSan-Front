import React from "react";
import S from "./modal.styles";
import { theme } from "src/styles/colors/theme";
import { ReactNode } from "react";
import {
  MdWarning,
  MdCheckCircle,
  MdInfoOutline,
  MdDirectionsWalk,
} from "react-icons/md";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: ReactNode;
  cancelText?: string;
  confirmText?: string;
  modalType?:
    | "stop"
    | "done"
    | "back"
    | "delete"
    | "default"
    | "location"
    | "secession"
    | "crewSecession";
  mode?: "create" | "follow";
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  cancelText = "취소",
  confirmText = "확인",
  modalType = "default",
  mode = "create",
}: ConfirmationModalProps) => {
  const getModalContent = () => {
    switch (modalType) {
      case "location":
        return {
          icon: <MdWarning size={52} color={theme.Red300} />,
          title: "위치 접근 권한 필요",
        };
      case "stop":
        return {
          icon: <MdWarning size={52} color={theme.Red300} />,
          title: "산책 조건 미달",
        };
      case "done":
        if (mode === "create") {
          return {
            icon: <MdCheckCircle size={52} color={theme.Green500} />,
            title: "산책로 등록",
          };
        } else {
          return {
            icon: <MdDirectionsWalk size={52} color={theme.Following} />,
            title: "이용 완료",
          };
        }
      case "back":
        return {
          icon: <MdInfoOutline size={52} color={theme.Following} />,
        };
      case "delete":
        return {
          icon: <MdWarning size={52} color={theme.Red300} />,
          title: "산책로 삭제",
        };
      case "secession":
        return {
          icon: <MdWarning size={52} color={theme.Red300} />,
          title: "서비스 탈퇴",
        };
        case "crewSecession":
          return {
            icon: <MdWarning size={52} color={theme.Red300} />,
            title: "크루 탈퇴",
          };
      default:
        return {
          icon: <MdInfoOutline size={52} color={theme.Following} />,
          title: "알림",
        };
    }
  };

  const { icon, title } = getModalContent();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <S.ModalContainer>
        <S.ModalContent>
          <S.IconContainer>{icon}</S.IconContainer>

          <S.TextContainer>
            {title && <S.TitleText>{title}</S.TitleText>}
            <S.ModalText>{message}</S.ModalText>
          </S.TextContainer>

          <S.ButtonContainer>
            <S.Button onClick={onClose}>{cancelText}</S.Button>
            <S.Button isConfirm onClick={onConfirm}>
              {confirmText}
            </S.Button>
          </S.ButtonContainer>
        </S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;