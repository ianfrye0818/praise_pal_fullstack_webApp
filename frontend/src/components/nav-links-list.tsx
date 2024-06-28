import { IMAGES, sidebarLinks } from '@/constants';
import { Link, useNavigate } from '@tanstack/react-router';
import NavBarLink from './sidebar/nav-bar-link';
import { useAuth } from '@/hooks/useAuth';
import useAdminMode from '@/hooks/useAdminMode';
import { Button } from './ui/button';
import { ShieldCheck } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function NavLinksList() {
  const { isAdmin } = useAuth().state;
  const { setAdminMode } = useAdminMode();
  const navigate = useNavigate();
  return (
    <nav className='flex flex-col gap-4'>
      <Link
        to='/'
        className='mb-12 cursor-pointer items-center gap-2 flex'
      >
        <img
          src={logo}
          alt='logo'
          className='w-full object-contain'
        />
      </Link>
      {sidebarLinks.map((link) => (
        <NavBarLink
          key={link.label}
          link={link}
        />
      ))}
      {isAdmin && (
        <Button
          variant={'link'}
          className='flex gap-3 items-center p-3 justify-start rounded-md hover:no-underline text-lg'
          onClick={async () => {
            setAdminMode(true);
            await navigate({ to: '/admin/dashboard' });
          }}
        >
          <ShieldCheck /> Admin Dashboard
        </Button>
      )}
    </nav>
  );
}
