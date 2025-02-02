export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error';
  }
  
  export interface ToastContextType {
    showToast: (message: string, type: 'success' | 'error') => void;
  }
  