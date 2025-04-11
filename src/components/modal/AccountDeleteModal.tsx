import React from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { theme } from "src/styles/colors/theme";
import { MdWarning } from "react-icons/md";

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
    props.isConfirm ? theme.Red300 : theme.Gray200};
  color: ${(props) => (props.isConfirm ? theme.White : theme.Gray700)};
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 130px;

  &:hover {
    background-color: ${(props) =>
      props.isConfirm ? theme.Red400 : theme.Gray300};
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface AccountDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const AccountDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: AccountDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <IconContainer>
          <MdWarning size={52} color={theme.Red300} />
        </IconContainer>

        <TitleText>계정 삭제</TitleText>
        <ModalText>
          정말로 계정을 삭제하시겠습니까?
          {"\n"}삭제 후에는 복구가 불가능합니다.
        </ModalText>

        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button isConfirm onClick={onDelete}>
            삭제
          </Button>
        </ButtonContainer>
      </ModalContent>
    </Modal>
  );
};

export default AccountDeleteModal;
