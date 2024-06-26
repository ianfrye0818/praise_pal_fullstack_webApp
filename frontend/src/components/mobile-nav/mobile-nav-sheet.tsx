import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import SideBarFooter from '../sidebar/sidebar-footer';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import NavLinksList from '../nav-links-list';
import useAdminMode from '@/hooks/useAdminMode';
import AdminNavLinkList from '../admin-nav-link-list';

export default function MobileNavSheet() {
  const [open, setOpen] = useState(false);
  const { adminMode } = useAdminMode();

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
            <SheetClose asChild>{adminMode ? <AdminNavLinkList /> : <NavLinksList />}</SheetClose>
            <SideBarFooter />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
