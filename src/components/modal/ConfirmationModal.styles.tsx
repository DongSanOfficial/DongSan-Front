import styled from "styled-components";
import { theme } from "src/styles/colors/theme";

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 28px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    margin-bottom: 10px;
    transform: scale(1.1);
  }
`;

const TitleText = styled.h3`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: ${theme.Gray900};

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 1.4rem;
  }
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  white-space: pre-line;
  margin: 0;
  color: ${theme.Gray700};
  max-width: 280px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 1.1rem;
    max-width: 320px;
    line-height: 1.6;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 380px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 16px;
    margin-bottom: 12px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: 8px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    gap: 20px;
    margin-top: 12px;
  }
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

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 14px 28px;
    border-radius: 14px;
    font-size: 1rem;
    max-width: 150px;
  }
`;

const S = {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  IconContainer,
  TitleText,
  ModalText,
  TextContainer,
  ButtonContainer,
  Button,
};

export default S;