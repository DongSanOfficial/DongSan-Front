import React, { useEffect } from "react";
import styled from "styled-components";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { theme } from "@/styles/colors/theme";

const StyledToast = styled.div<{ type: "success" | "error" }>`
  border-radius: 20px;
  font-size: 20px;
  font-weight: 500;
  background-color: ${theme.White};
  width: 360px;
  height: 66px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 8px;
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div<{ type: "success" | "error" }>`
  font-size: 24px;
  color: ${theme.Black};
`;

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}
const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 2000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);
  return (
    <StyledToast type={type} onClick={onClose}>
      <IconWrapper type={type}>
        {" "}
        {type === "success" ? <FaRegCheckCircle /> : <MdError />}
      </IconWrapper>
      {message}
    </StyledToast>
  );
};
export default Toast;
