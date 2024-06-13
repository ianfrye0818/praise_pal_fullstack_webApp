'use client';

import { useSession } from 'next-auth/react';

export function useGetUser() {
  const session = useSession();
  const { status, data } = session;
  return { status, user: data?.user };
}
