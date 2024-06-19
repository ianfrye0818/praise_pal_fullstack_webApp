import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { sidebarLinks } from '@/constants';
import SideBarFooter from '../sidebar/sidebar-footer';
import NavBarLink from '../sidebar/nav-bar-link';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

export default function MobileNavSheet() {
  const [open, setOpen] = useState(false);
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
              <nav className='flex h-full flex-col gap-6 pt-16'>
                {sidebarLinks.map((link) => (
                  <NavBarLink
                    key={link.label}
                    link={link}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
            </SheetClose>
            <SideBarFooter />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
