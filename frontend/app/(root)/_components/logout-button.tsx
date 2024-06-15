'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { logout } from '@/auth/auth-actions';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ refreshToken }: { refreshToken: string }) {
  // const { user } = useGetUser();
  const router = useRouter();
  return (
    <Button
      variant={'ghost'}
      size='icon'
      onClick={async () => {
        await logout(refreshToken);
        router.push('/sign-in');
      }}
    >
      <Image
        src={'/icons/logout.svg'}
        alt='logout'
        width={24}
        height={24}
      />
    </Button>
  );
}
