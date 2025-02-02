import styled from 'styled-components';
import Modal from './Modal'
import { theme } from "src/styles/colors/theme";
import { ReactNode } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: ReactNode;
  cancelText?: string;
  confirmText?: string;
}

const ModalText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  white-space: pre-line;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button<{ isConfirm?: boolean }>`
  padding: 12px 30px;
  border-radius: 15px;
  border: none;
  background-color: ${props => props.isConfirm ? theme.Green500 : theme.Gray400};
  color: ${theme.White};
  cursor: pointer;
`;

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message,
  cancelText = "취소",
  confirmText = "확인"
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
      <ModalText>{message}</ModalText>
      <ButtonContainer>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button isConfirm onClick={onConfirm}>{confirmText}</Button>
      </ButtonContainer>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;