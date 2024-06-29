import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const ScrollToTop = () => {
  const { history } = useRouter();
  const { pathname } = history.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
