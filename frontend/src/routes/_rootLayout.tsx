import Sidebar from '@/components/sidebar/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/sign-in' });
    }
  },
  component: () => <RootLayout />,
});

export function RootLayout() {
  return (
    <main className='flex gap-2 h-full'>
      <Sidebar />
      <div className='lg:ml-64 p-4 flex-1'>
        <Outlet />
      </div>
    </main>
  );
}
