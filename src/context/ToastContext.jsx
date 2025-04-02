import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info',
  });

  const showToast = (message, type = 'info') => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast({
      show: false,
      message: '',
      type: 'info',
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
};