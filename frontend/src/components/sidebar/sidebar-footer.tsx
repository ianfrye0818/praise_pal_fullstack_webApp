import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Link } from '@tanstack/react-router';
import LogoutButton from './logout-button';
import { useAuth } from '@/hooks/useAuth';
import UpdateUserDialog from '../forms/update-user-dialog';

export default function SideBarFooter() {
  const { state } = useAuth();
  const user = state.user;
  if (!user) return <div>Footer</div>;
  // if(!user) return null;

  return (
    <footer className='footer'>
      <div className='mt-auto flex items-center gap-2 relative'>
        <UpdateUserDialog />
        <div className='flex-1'>
          <p className='font-medium'>{user?.displayName}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</p>
        </div>

        <LogoutButton />
      </div>
    </footer>
  );
}
