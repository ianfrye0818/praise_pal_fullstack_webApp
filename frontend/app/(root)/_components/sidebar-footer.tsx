'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { logout } from '@/auth/auth-actions';
import { useGetUser } from '@/hooks/getUser';

export default function SideBarFooter({ type }: { type: 'desktop' | 'mobile' }) {
  const { user, status } = useGetUser();
  const router = useRouter();
  if (status === 'loading') return <div>Loading...</div>;

  return (
    <footer className='footer'>
      <div className='mt-auto flex items-center gap-2'>
        <Link href='/user-settings'>
          <Avatar>
            <AvatarFallback color='blue'>{user?.displayName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className='flex-1'>
          <p className='font-medium'>{user?.displayName}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</p>
        </div>

        <Button
          variant={'ghost'}
          size='icon'
          onClick={async () => {
            await logout(user?.refreshToken);
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
      </div>
    </footer>
  );
}
