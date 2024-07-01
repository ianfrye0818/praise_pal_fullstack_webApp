import { useEffect } from 'react';
import { useRouterState, redirect } from '@tanstack/react-router';

const GetLastPathName = () => {
  const lastPath = sessionStorage.getItem('lastPath') || null;

  const { pathname } = useRouterState().location;

  useEffect(() => {
    if (lastPath && lastPath !== pathname) {
      redirect({ to: lastPath });
    }
  });
  return null;
};

export default GetLastPathName;
