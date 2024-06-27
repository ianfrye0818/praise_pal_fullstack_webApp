import { IMAGES } from '@/constants';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout')({
  beforeLoad: ({ context }) => {
    const { isAuthenticated, loading } = context.state;
    if (!loading && isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <AuthLayout />,
});

function AuthLayout() {
  return (
    <main className='h-full w-full'>
      <header className='h-[96px]  p-1'>
        <div className='container mx-auto '>
          <img
            src={IMAGES.logo}
            alt='logo'
            width={180}
          />
        </div>
      </header>
      <Outlet />
    </main>
  );
}
