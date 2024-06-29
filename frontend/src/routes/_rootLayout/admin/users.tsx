import { getCompanyUsers } from '@/api/api-handlers';
import UsersTable from '@/components/admin/tables/user-table';
import { User } from '@/types';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin/users')({
  loader: async ({ context }) => await getCompanyUsers(context.state.user?.companyId as string),
  component: () => <UsersAdminPage />,
});

function UsersAdminPage() {
  const users = useLoaderData({ from: '/_rootLayout/admin/users' }) as User[];
  return (
    <div className='w-full py-5 p-1 md:p-4 h-full'>
      <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl my-4'>Users</h2>
      </div>
      <UsersTable users={users} />
    </div>
  );
}
