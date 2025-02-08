import React, { createContext, useState, useCallback } from "react";
import styled from "styled-components";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { theme } from "src/styles/colors/theme";
import { Toast, ToastContextType } from "src/types/toast.type";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const StyledToast = styled.div<{ type: "success" | "error" }>`
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.White};
  background-color: ${theme.Gray600};
  width: calc(100vw - 40px);
  height: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div<{ type: "success" | "error" }>`
  color: ${theme.White};
`;

const Message = styled.span`
  flex: 1;
`;

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      // 각 토스트 메시지에 고유한 식별자(ID)를 생성하기 위해
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <StyledToast key={toast.id} type={toast.type}>
            <IconWrapper type={toast.type}>
              {toast.type === "success" ? <FaRegCheckCircle /> : <MdError />}
            </IconWrapper>
            <Message>{toast.message}</Message>
          </StyledToast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
