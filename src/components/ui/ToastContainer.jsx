import React from 'react';
import { useToast } from '../../context/ToastContext';
import Toast from './Toast';

const ToastContainer = () => {
  const { toast, hideToast } = useToast();

  if (!toast.show) return null;

  return (
    <Toast
      message={toast.message}
      type={toast.type}
      duration={3000}
      onClose={hideToast}
    />
  );
};

export default ToastContainer;