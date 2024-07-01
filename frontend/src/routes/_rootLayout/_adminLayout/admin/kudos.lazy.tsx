import KudosTable from '@/components/admin/tables/kudos-table';
import useGetCompanyKudos from '@/hooks/api/useKudos/useGetCompanyKudos';
import { useAuth } from '@/hooks/useAuth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_rootLayout/_adminLayout/admin/kudos')({
  component: () => <KudosAdminPage />,
});

function KudosAdminPage() {
  const { user } = useAuth().state;
  const {
    data: kudos,
    isLoading,
    isError,
  } = useGetCompanyKudos({
    companyId: user?.companyId as string,
  });

  //TODO: add loading and error components
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  //TODO: add no kudos found component
  if (!kudos || !kudos.length) return <div>No Kudos</div>;

  return (
    <div className='w-full py-5 p-1 md:p-4 h-full'>
      <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl my-4'>Kudos</h2>
      </div>
      <KudosTable kudos={kudos} />
    </div>
  );
}
