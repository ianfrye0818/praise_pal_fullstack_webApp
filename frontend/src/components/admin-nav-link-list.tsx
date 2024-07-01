import { adminSidebarLinks, IMAGES } from '@/constants';
import { Link, useNavigate } from '@tanstack/react-router';
import NavBarLink from './sidebar/nav-bar-link';
import useAdminMode from '@/hooks/useAdminMode';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

import logo from '@/assets/logo.png';

export default function AdminNavLinkList() {
  const { setAdminMode } = useAdminMode();
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

      {adminSidebarLinks.map((link) => (
        <NavBarLink
          key={link.label}
          link={link}
        />
      ))}
      <Button
        variant={'ghost'}
        className='justify-start p-2 '
        onClick={async () => {
          setAdminMode(false);
        }}
      >
        <>
          {' '}
          <ArrowLeft /> Back
        </>
        {/* <Link to='/'>
          <ArrowLeft />
          Back
        </Link> */}
      </Button>
    </nav>
  );
}
