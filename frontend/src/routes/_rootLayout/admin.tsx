import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAdmin) {
      alert('You are not an admin');
      throw redirect({ to: '/' });
    }
  },
  component: () => <AdminPage />,
});

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
