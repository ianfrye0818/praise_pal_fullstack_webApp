import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

export default function SetPathLocaiton() {
  const { history } = useRouter();
  const { pathname } = history.location;

  const canSavePath = pathname !== '/sign-in' && pathname !== '/sign-up';

  useEffect(() => {
    if (canSavePath) {
      sessionStorage.setItem('lastPath', pathname);
    }
  }, [pathname, canSavePath]);

  return null;
}
