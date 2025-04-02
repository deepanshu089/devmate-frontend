import { useEffect, useState } from 'react';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import Toast from './Toast';

const NetworkToast = () => {
  const { isOnline, connectionQuality } = useNetworkStatus();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    if (!isOnline) {
      setToastMessage('You are offline. Please check your internet connection.');
      setToastType('error');
      setShowToast(true);
    } else if (connectionQuality === 'weak') {
      setToastMessage('Your internet connection is weak. This may affect performance.');
      setToastType('warning');
      setShowToast(true);
    } else if (connectionQuality === 'moderate') {
      setToastMessage('Your internet connection is moderate.');
      setToastType('info');
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [isOnline, connectionQuality]);

  if (!showToast) return null;

  return (
    <Toast
      message={toastMessage}
      type={toastType}
      duration={5000}
      onClose={() => setShowToast(false)}
    />
  );
};

export default NetworkToast;