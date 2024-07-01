import AddKudosDialog from '@/components/dialogs/add-kudos-dialog';
import MobileNavSheet from '@/components/mobile-nav/mobile-nav-sheet';
import Sidebar from '@/components/sidebar/sidebar';
import useAdminMode from '@/hooks/useAdminMode';
import { useAuth } from '@/hooks/useAuth';
import { createFileRoute, Outlet, redirect, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout')({
  // beforeLoad: async ({ context }) => {
  //   const { isAuthenticated, loading } = context.state;
  //   if (!isAuthenticated && !loading) {
  //     throw redirect({ to: '/sign-in' });
  //   }
  // },
  component: () => <RootLayout />,
});

export function RootLayout() {
  const { loading, isAuthenticated } = useAuth().state;
  const { adminMode } = useAdminMode();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' />;
  }

  return (
    <main className='flex gap-2 h-full'>
      <Sidebar />

      <div className='lg:ml-[300px] p-4 flex-1 flex flex-col'>
        {!adminMode && <AddKudosDialog />}
        <Outlet />
      </div>
      <div className='absolute lg:hidden top-2 left-2'>
        <MobileNavSheet />
      </div>
    </main>
  );
}
