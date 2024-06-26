import UpdateUserDialog from '../dialogs/update-user-dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import LogoutButton from './logout-button';
import { useAuth } from '@/hooks/useAuth';

export default function SideBarFooter() {
  const { state } = useAuth();
  const user = state.user;
  if (!user) return <div>Footer</div>;

  return (
    <footer className='footer'>
      <div className='mt-auto flex items-center gap-2 relative'>
        <UpdateUserDialog
          user={user}
          trigger={<UserDialogTrigger displayName={user.displayName} />}
        />
        <div className='flex-1'>
          <p className='font-medium'>{user?.displayName}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</p>
        </div>

        <LogoutButton />
      </div>
    </footer>
  );
}

function UserDialogTrigger({ displayName }: { displayName: string }) {
  return (
    <Avatar>
      <AvatarFallback className='bg-blue-500 text-zinc-100'>
        {displayName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
