import { getCompany, getCompanyKudos, getCompanyUsers } from '@/api/api-handlers';
import CompanyCard from '@/components/admin/company-card';
import KudosDashboardCard from '@/components/admin/kudos-dashboard-card';
import UsersDashboardCard from '@/components/admin/users-dashboard.card';
import { CustomError } from '@/errors';
import { User } from '@/types';
import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin/dashboard')({
  beforeLoad: async ({ context }) => {
    const { isAdmin } = context.state;
    if (!isAdmin) {
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ context }) => await getAdminDashBoardData(context.state.user as User),
  component: () => <AdminDashboard />,
});

export function AdminDashboard() {
  const { users, kudos, company } = useLoaderData({ from: '/_rootLayout/admin/dashboard' });
  return (
    <main className='flex flex-1 flex-col gap-4 p-5 md:gap-8 md:p-6'>
      <UsersDashboardCard users={users} />
      <KudosDashboardCard kudos={kudos} />
      <CompanyCard company={company} />
    </main>
  );
}

export async function getAdminDashBoardData(user: User) {
  try {
    const data = await Promise.all([
      getCompanyUsers(user.companyId),
      getCompanyKudos({ companyId: user.companyId }),
      getCompany(user.companyId),
    ]);

    if (!data[0] || !data[1] || !data[2]) {
      throw new CustomError('Error fetching dashboard data', 404);
    }

    return {
      users: data[0],
      kudos: data[1],
      company: data[2],
    };
  } catch (error) {
    console.error(error);
    throw new CustomError('Error fetching dashboard data', 404);
  }
}
