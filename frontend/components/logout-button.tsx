'use client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function LogoutButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/sign-in');
  }

  return children ? (
    <Button
      asChild
      onClick={async () => handleLogout}
    >
      {children}
    </Button>
  ) : (
    <Button
      onClick={async () => handleLogout()}
      className={className}
    >
      Logout
    </Button>
  );
}
