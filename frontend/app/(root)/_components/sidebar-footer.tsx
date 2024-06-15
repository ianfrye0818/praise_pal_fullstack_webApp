import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import Link from 'next/link';
import LogoutButton from './logout-button';
import { getSessionUser } from '@/auth/auth-actions';

export default async function SideBarFooter({ type }: { type: 'desktop' | 'mobile' }) {
  const user = await getSessionUser();

  if (!user) return null;

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

        <LogoutButton refreshToken={user?.refreshToken} />
      </div>
    </footer>
  );
}
