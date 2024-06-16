import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin/dashboard')({
  component: () => <AdminDashboard />,
});

export function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
