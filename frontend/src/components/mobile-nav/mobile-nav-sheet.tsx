import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { adminSideBarLink, IMAGES, sidebarLinks } from '@/constants';
import SideBarFooter from '../sidebar/sidebar-footer';
import NavBarLink from '../sidebar/nav-bar-link';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';

export default function MobileNavSheet() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth().state;
  return (
    <section>
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Praise Pal</h1>
          <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto;'>
            <SheetClose asChild>
              <nav className='flex flex-col gap-4'>
                <Link
                  to='/'
                  className='mb-12 cursor-pointer items-center gap-2 flex'
                >
                  {/* <h1 className='text-4xl font-bold w-full'>Praise Pal</h1>
                   */}
                  <img
                    src={IMAGES.logo}
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
                {isAdmin && <NavBarLink link={adminSideBarLink} />}
              </nav>
            </SheetClose>
            <SideBarFooter />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
