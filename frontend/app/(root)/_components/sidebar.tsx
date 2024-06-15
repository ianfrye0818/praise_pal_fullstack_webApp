import Link from 'next/link';
import { adminSideBarLink, sidebarLinks } from '@/constants';
import SideBarFooter from './sidebar-footer';
import NavBarLink from '@/components/nav-bar-link';
import { Role } from '@/types';
import { getSessionUser } from '@/auth/auth-actions';

export default async function Sidebar() {
  const user = await getSessionUser();
  console.log(user?.role);

  const isAdmin = user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN;

  return (
    <section className='fixed hidden h-full lg:flex flex-col justify-between border-r border-zinc-200 p-3 bg-gray-100 md:w-60'>
      {/* <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex"></div> */}
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
