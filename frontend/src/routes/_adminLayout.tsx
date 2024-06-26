import MobileNavSheet from '@/components/mobile-nav/mobile-nav-sheet';
import AdminSideBar from '@/components/sidebar/admin-sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_adminLayout')({
  component: () => <AdminLayout />,
});

export function AdminLayout() {
  return (
    <main className='flex gap-2 h-full'>
      <AdminSideBar />

      <div className='lg:ml-[300px] p-4 flex-1 flex flex-col'>
        <Outlet />
      </div>
      <div className='absolute lg:hidden top-2 left-2'>
        <MobileNavSheet />
      </div>
    </main>
  );
}
