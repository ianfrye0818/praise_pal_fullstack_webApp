import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

const GetLastPathName = () => {
  const { history } = useRouter();

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && lastPath !== window.location.pathname) {
      history.replace(lastPath);
    }
  }, [history]);

  return null;
};

export default GetLastPathName;
