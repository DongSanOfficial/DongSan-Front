import { ToastContext } from "src/context/toast/ToastContext";
import { useContext } from "react";

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
      throw new Error('ToastProvider 내에서 사용가능');
    }
    return context;
  };