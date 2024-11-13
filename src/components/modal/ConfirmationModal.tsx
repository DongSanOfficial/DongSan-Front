import styled from 'styled-components';
import Modal from './Modal'

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  cancelText?: string;
  confirmText?: string;
}

const ModalText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  margin: 20px 0 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button<{ isConfirm?: boolean }>`
  padding: 12px 30px;
  border-radius: 20px;
  border: 0.5px solid black;
  background-color: white;
  color: black;
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