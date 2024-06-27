import CompanyCard from '@/components/admin/company-card';
import KudosDashboardCard from '@/components/admin/kudos-dashboard-card';
import KudosTable from '@/components/admin/tables/kudos-table';
import UsersTable from '@/components/admin/tables/user-table';
import UsersDashboardCard from '@/components/admin/tables/users-dashboard.card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { createFileRoute, redirect, Link } from '@tanstack/react-router';

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
  const { user } = useAuth().state;
  return (
    <main className='flex flex-1 flex-col gap-4 p-5 md:gap-8 md:p-6'>
      <UsersDashboardCard companyId={user?.companyId as string} />
      <KudosDashboardCard companyId={user?.companyId as string} />
      <CompanyCard companyId={user?.companyId as string} />
    </main>
  );
}
