import styled from "styled-components";
import Modal from "./Modal";
import { theme } from "src/styles/colors/theme";
import { ReactNode } from "react";
import { MdWarning, MdCheckCircle, MdInfoOutline, MdDirectionsWalk } from "react-icons/md";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: ReactNode;
  cancelText?: string;
  confirmText?: string;
  modalType?: "stop" | "done" | "back" | "default";
  mode?: "create" | "follow";
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  `;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
`;

const TitleText = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: ${theme.Gray900};
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-line;
  margin: 0;
  color: ${theme.Gray700};
  max-width: 280px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: 8px;
`;

const Button = styled.button<{ isConfirm?: boolean }>`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 500;
  font-size: 0.95rem;
  background-color: ${(props) =>
    props.isConfirm ? theme.Green500 : theme.Gray200};
  color: ${(props) => (props.isConfirm ? theme.White : theme.Gray700)};
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 130px;

  &:hover {
    background-color: ${(props) =>
      props.isConfirm ? theme.Green600 : theme.Gray300};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ConfirmationModal = ({
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
      case "stop":
        return {
          icon: <MdWarning size={52} color={theme.Red} />,
          title: "산책 조건 미달",
          iconColor: theme.Red,
        };
      case "done":
        if (mode === "create") {
          return {
            icon: <MdCheckCircle size={52} color={theme.Green500} />,
            title: "산책로 등록",
            iconColor: theme.Green500,
          };
        } else {
          return {
            icon: <MdDirectionsWalk size={52} color={theme.Following} />,
            title: "이용 완료",
            iconColor: theme.Following,
          };
        }
      case "back":
        return {
          icon: <MdInfoOutline size={52} color={theme.Following} />,
          iconColor: theme.Following,
        };
      default:
        return {
          icon: <MdInfoOutline size={52} color={theme.Following} />,
          title: "알림",
          iconColor: theme.Following,
        };
    }
  };

  const { icon, title } = getModalContent();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <IconContainer>{icon}</IconContainer>

        <TextContainer>
          {title && <TitleText>{title}</TitleText>}
          <ModalText>{message}</ModalText>
        </TextContainer>

        <ButtonContainer>
          <Button onClick={onClose}>{cancelText}</Button>
          <Button isConfirm onClick={onConfirm}>
            {confirmText}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;