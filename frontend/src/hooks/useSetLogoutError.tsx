import { useEffect, useState } from 'react';

export default function useSetLogoutError() {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const logouterror = localStorage.getItem('logouterror');
    if (logouterror) {
      setError(logouterror);
      localStorage.removeItem('logouterror');
    }
  }, []);
  return error;
}
