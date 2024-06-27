import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import UsersTable from './user-table';

export default function UsersDashboardCard({ companyId }: { companyId: string }) {
  return (
    <>
      <div>
        <div className='flex items-center'>
          <h2 className='font-semibold text-lg md:text-2xl my-4'>Users</h2>
          <Button
            className='ml-auto'
            size={'sm'}
            asChild
          >
            <Link to={'/admin/users'}>View All</Link>
          </Button>
        </div>
        <UsersTable
          limited
          companyId={companyId}
        />
      </div>
    </>
  );
}
