import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { Link } from '@tanstack/react-router';
import LogoutButton from './logout-button';

export default function SideBarFooter() {
  const { user } = useAuth();

  if (!user) return <div>Footer</div>;
  // if(!user) return null;

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

        <LogoutButton />
      </div>
    </footer>
  );
}
