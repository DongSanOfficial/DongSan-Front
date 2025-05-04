import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Toast, ToastContextType } from "src/context/toast/toast.type";
import ToastComponent, {
  ToastContainer,
} from "src/context/toast/ToastComponent";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }

      const id = Math.random().toString(36).substr(2, 9);
      const newToast = { id, message, type };

      if (toast && visible) {
        setVisible(false);
        animationTimeoutRef.current = setTimeout(() => {
          setToast(newToast);
          setVisible(true);
        }, 100);
      } else {
        setToast(newToast);
        setVisible(true);
      }

      timeoutRef.current = setTimeout(() => {
        setVisible(false);

        animationTimeoutRef.current = setTimeout(() => {
          setToast(null);
        }, 100);
      }, 2000);
    },
    [toast, visible]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer>
        <ToastComponent toast={toast} visible={visible} />
      </ToastContainer>
    </ToastContext.Provider>
  );
};
