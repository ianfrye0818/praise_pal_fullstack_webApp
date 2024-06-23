import AddKudosDialog from '@/components/forms/add-kudos-dialog';
import MobileNavSheet from '@/components/mobile-nav/mobile-nav-sheet';
import Sidebar from '@/components/sidebar/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated, loading } = context.state;
    if (!isAuthenticated && !loading) {
      throw redirect({ to: '/sign-in' });
    }
  },
  component: () => <RootLayout />,
});

export function RootLayout() {
  return (
    <main className='flex gap-2 h-full'>
      <Sidebar />

      <div className='lg:ml-[300px] p-4 flex-1 flex flex-col'>
        <AddKudosDialog />
        <Outlet />
      </div>
      <div className='absolute lg:hidden top-2 left-2'>
        <MobileNavSheet />
      </div>
    </main>
  );
}
