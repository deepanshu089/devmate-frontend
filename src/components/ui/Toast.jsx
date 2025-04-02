import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingProgress = Math.max(0, 100 - (elapsedTime / duration) * 100);
      setProgress(remainingProgress);

      if (remainingProgress === 0) {
        onClose();
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  const toastVariants = cva(
    'fixed bottom-4 right-4 z-50 min-w-[300px] max-w-sm rounded-lg shadow-lg backdrop-blur-sm p-4 transform transition-all duration-300 ease-in-out flex items-center gap-3 border',
    {
      variants: {
        type: {
          success: 'bg-success/95 text-success-content border-success/30',
          error: 'bg-error/95 text-error-content border-error/30',
          warning: 'bg-warning/95 text-warning-content border-warning/30',
          info: 'bg-info/95 text-info-content border-info/30',
        },
      },
      defaultVariants: {
        type: 'success',
      },
    }
  );

  return createPortal(
    <div
      className={cn(toastVariants({ type }), 'overflow-hidden')}
      role="alert"
    >
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20" style={{ width: `${progress}%`, transition: 'width 10ms linear' }} />
      {type === 'success' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
      {type === 'error' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      {type === 'warning' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )}
      {type === 'info' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )}
      <p className="font-medium flex-grow">{message}</p>
    </div>,
    document.body
  );
};

export default Toast;