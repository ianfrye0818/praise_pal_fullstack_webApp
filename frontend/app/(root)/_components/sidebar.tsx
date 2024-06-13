'use client';
import Link from 'next/link';
import { adminSideBarLink, sidebarLinks } from '@/constants';
import SideBarFooter from './sidebar-footer';
import NavBarLink from '@/components/nav-bar-link';
import { useGetUser } from '@/hooks/getUser';
import { Role } from '@/types';

export default function Sidebar() {
  const { user } = useGetUser();

  const isAdmin = user?.role === Role.ADMIN || user?.role === Role.USER;

  return (
    <section className='fixed flex h-screen w-fit flex-col justify-between border-r border-gray-200 p-3 bg-gray-100 min-w-[250px]'>
      <nav className='flex flex-col gap-4'>
        <Link
          href='/'
          className='mb-12 cursor-pointer items-center gap-2 flex'
        >
          <h1 className='text-4xl font-bold w-full'>Praise Pal</h1>
        </Link>
        {sidebarLinks.map((link) => (
          <NavBarLink
            key={link.label}
            link={link}
          />
        ))}
        {isAdmin && <NavBarLink link={adminSideBarLink} />}
      </nav>

      <SideBarFooter type='desktop' />
    </section>
  );
}
