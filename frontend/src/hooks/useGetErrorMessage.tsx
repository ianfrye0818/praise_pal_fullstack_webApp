import { useEffect, useState } from 'react';

export default function useGetErrorMessage() {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const errorMessage = localStorage.getItem('error');
    if (errorMessage) {
      setError(errorMessage);
      localStorage.removeItem('error');
    }
  }, []);
  return error;
}
