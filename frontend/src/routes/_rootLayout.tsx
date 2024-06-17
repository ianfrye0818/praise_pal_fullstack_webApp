import AddKudosDialog from '@/components/forms/add-kudos-dialog';
import Sidebar from '@/components/sidebar/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated, loading } = context.state;
    console.log({ isAuthenticated, loading });
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
      <div className='lg:ml-64 p-4 flex-1 flex flex-col'>
        <AddKudosDialog />
        <Outlet />
      </div>
    </main>
  );
}
