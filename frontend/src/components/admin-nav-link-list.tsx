import { adminSidebarLinks, IMAGES } from '@/constants';
import { Link, useNavigate } from '@tanstack/react-router';
import NavBarLink from './sidebar/nav-bar-link';
import useAdminMode from '@/hooks/useAdminMode';
import { Button } from './ui/button';
import { X } from 'lucide-react';

export default function AdminNavLinkList() {
  const { setAdminMode } = useAdminMode();
  const navigate = useNavigate();
  return (
    <nav className='flex flex-col gap-4'>
      <Link
        to='/'
        className='mb-12 cursor-pointer items-center gap-2 flex'
      >
        <img
          src={IMAGES.logo}
          alt='logo'
          className='w-full object-contain'
        />
      </Link>
      {adminSidebarLinks.map((link) => (
        <NavBarLink
          key={link.label}
          link={link}
        />
      ))}
      <Button
        onClick={async () => {
          setAdminMode(false);
          await navigate({ to: '/' });
        }}
        className='flex gap-2 justify-start'
      >
        <X />
        Exit Admin
      </Button>
    </nav>
  );
}
