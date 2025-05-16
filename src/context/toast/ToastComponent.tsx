import React, { memo } from "react";
import styled from "styled-components";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { theme } from "src/styles/colors/theme";
import { Toast } from "src/context/toast/toast.type";

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100vw - 40px);
  max-width: 430px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    bottom: 120px;
    max-width: 500px;
  }

  /* 큰 태블릿 및 노트북 */
  @media screen and (min-width: 1024px) {
    max-width: 600px;
  }
`;

const StyledToast = styled.div<{ type: "success" | "error"; visible: boolean }>`
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.White};
  background-color: ${theme.Gray800};
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.visible ? "0.9" : "0")};
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  transition: opacity 0.3s ease-in-out;
  will-change: opacity;
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 16px;
    padding: 18px 15px;
    border-radius: 25px;
    gap: 15px;
  }
`;

const IconWrapper = styled.div<{ type: "success" | "error" }>`
  color: ${theme.White};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    font-size: 22px;
  }
`;

const Message = styled.span`
  flex: 1;

  /* 태블릿 환경 */
  @media screen and (min-width: 700px) {
    padding: 0 5px;
  }
`;

interface ToastComponentProps {
  toast: Toast | null;
  visible: boolean;
}

const ToastComponent = memo(({ toast, visible }: ToastComponentProps) => {
  if (!toast) return null;

  return (
    <StyledToast type={toast.type} visible={visible}>
      <IconWrapper type={toast.type}>
        {toast.type === "success" ? <FaRegCheckCircle /> : <MdError />}
      </IconWrapper>
      <Message>{toast.message}</Message>
    </StyledToast>
  );
});

export default ToastComponent;
