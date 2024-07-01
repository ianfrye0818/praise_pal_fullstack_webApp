import CompanyCard from '@/components/admin/company-card';
import KudosDashboardCard from '@/components/admin/kudos-dashboard-card';
import UsersDashboardCard from '@/components/admin/users-dashboard.card';
import useGetAdminDashBoardData from '@/hooks/api/useGetAdminDashBoardData';
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
  const { users, kudos, company } = useGetAdminDashBoardData();

  return (
    <main className='flex flex-1 flex-col p-5 md:gap-8 md:p-6'>
      {company && <CompanyCard company={company} />}
      {users && <UsersDashboardCard users={users} />}
      {kudos && <KudosDashboardCard kudos={kudos} />}
    </main>
  );
}
