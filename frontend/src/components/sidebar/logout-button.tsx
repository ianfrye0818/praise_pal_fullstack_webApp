import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

import { useNavigate } from '@tanstack/react-router';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Button
      variant={'ghost'}
      size='icon'
      onClick={async () => {
        await logout();
        await navigate({ to: '/sign-in' });
      }}
    >
      <img
        src={'/icons/logout.svg'}
        alt='logout'
        width={24}
        height={24}
      />
    </Button>
  );
}
