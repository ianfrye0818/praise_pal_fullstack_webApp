import { Link } from '@tanstack/react-router';
import { adminSideBarLink, IMAGES, sidebarLinks } from '@/constants';
import NavBarLink from '@/components/sidebar/nav-bar-link';
import SideBarFooter from './sidebar-footer';
import { useAuth } from '@/hooks/useAuth';
import NavLinksList from '../nav-links-list';
import useAdminMode from '@/hooks/useAdminMode';
import AdminNavLinkList from '../admin-nav-link-list';

export default function Sidebar() {
  const { isAdmin } = useAuth().state;
  const { adminMode } = useAdminMode();

  return (
    <section className='fixed h-screen left-0 top-0 flex pt-8 max-lg:hidden sm:p-4 xl:p-6 2xl:w-[300px] flex-col justify-between border-r border-zinc-200 p-3 bg-gray-100 md:w-[275px]'>
      {adminMode ? <AdminNavLinkList /> : <NavLinksList />}

      <SideBarFooter />
    </section>
  );
}
