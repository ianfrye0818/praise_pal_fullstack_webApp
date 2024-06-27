import KudosTable from '@/components/admin/tables/kudos-table';
import UsersTable from '@/components/admin/tables/user-table';
import { useAuth } from '@/hooks/useAuth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin/kudos')({
  component: () => <KudosAdminPage />,
});

function KudosAdminPage() {
  const { user } = useAuth().state;
  return (
    <div className='w-full py-5 p-1 md:p-4 h-full'>
      <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl my-4'>Kudos</h2>
      </div>
      <KudosTable companyId={user?.companyId as string} />
    </div>
  );
}
