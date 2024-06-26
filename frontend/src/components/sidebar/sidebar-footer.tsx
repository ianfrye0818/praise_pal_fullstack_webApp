import UpdateUserDialog from '../dialogs/update-user-dialog';
import LogoutButton from './logout-button';
import { useAuth } from '@/hooks/useAuth';

export default function SideBarFooter() {
  const { state } = useAuth();
  const user = state.user;
  if (!user) return <div>Footer</div>;

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
