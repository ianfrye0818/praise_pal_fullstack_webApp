import { Link } from '@tanstack/react-router';
import { adminSideBarLink, sidebarLinks } from '@/constants';
import NavBarLink from '@/components/sidebar/nav-bar-link';
import SideBarFooter from './sidebar-footer';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const { state } = useAuth();
  const { isAdmin } = state;
  // sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px];
  return (
    <section className='fixed h-screen left-0 top-0 flex pt-8 max-lg:hidden sm:p-4 xl:p-6 2xl:w-[300px] flex-col justify-between border-r border-zinc-200 p-3 bg-gray-100 md:w-[275px]'>
      <nav className='flex flex-col gap-4'>
        <Link
          to='/'
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

      <SideBarFooter />
    </section>
  );
}
