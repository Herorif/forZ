import { useState, useEffect } from 'react';

export function useReadOnly(): boolean {
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
    const readOnly = localStorage.getItem('readOnly') === 'true';
    setIsReadOnly(readOnly);

    const handleStorageChange = () => {
      const readOnly = localStorage.getItem('readOnly') === 'true';
      setIsReadOnly(readOnly);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isReadOnly;
}
