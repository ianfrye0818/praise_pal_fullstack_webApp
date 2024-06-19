import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin/dashboard')({
  beforeLoad: async ({ context }) => {
    const { isAdmin } = context.state;
    if (!isAdmin) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <AdminDashboard />,
});

export function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
