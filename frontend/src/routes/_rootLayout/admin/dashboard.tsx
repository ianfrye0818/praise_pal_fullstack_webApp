import CompanyCard from '@/components/admin/company-card';
import KudosDashboardCard from '@/components/admin/kudos-dashboard-card';
import UsersDashboardCard from '@/components/admin/users-dashboard.card';
import useGetCompany from '@/hooks/api/useCompany/useGetCompany';
import useGetCompanyUsers from '@/hooks/api/useCompayUsers/useGetCompanyUsers';
import useGetCompanyKudos from '@/hooks/api/useKudos/useGetCompanyKudos';
import { useAuth } from '@/hooks/useAuth';

import { Role } from '@/types';
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
  const { user } = useAuth().state;

  const { data: users } = useGetCompanyUsers({
    companyId: user?.companyId as string,
    limit: 10,
    roles: [Role.USER, Role.ADMIN],
  });

  const { data: kudos } = useGetCompanyKudos({
    companyId: user?.companyId as string,
    limit: 10,
  });

  const { data: company } = useGetCompany(user?.companyId as string);
  // const { users, kudos, company } = useLoaderData({ from: '/_rootLayout/admin/dashboard' });
  return (
    <main className='flex flex-1 flex-col gap-4 p-5 md:gap-8 md:p-6'>
      {users && <UsersDashboardCard users={users} />}
      {kudos && <KudosDashboardCard kudos={kudos} />}
      {company && <CompanyCard company={company} />}
    </main>
  );
}
