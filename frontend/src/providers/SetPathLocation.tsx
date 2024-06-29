import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

export default function SetPathLocaiton() {
  const { history } = useRouter();
  const { pathname } = history.location;

  useEffect(() => {
    localStorage.setItem('lastPath', pathname);
  }, [pathname]);

  return null;
}
