import { getCompanyKudos } from '@/api/api-handlers';
import KudosTable from '@/components/admin/tables/kudos-table';
import { TKudos } from '@/types';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/admin/kudos')({
  loader: async ({ context }) =>
    await getCompanyKudos({ companyId: context.state.user?.companyId as string }),
  component: () => <KudosAdminPage />,
});

function KudosAdminPage() {
  const kudos = useLoaderData({ from: '/_rootLayout/admin/kudos' }) as TKudos[];
  return (
    <div className='w-full py-5 p-1 md:p-4 h-full'>
      <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl my-4'>Kudos</h2>
      </div>
      <KudosTable kudos={kudos} />
    </div>
  );
}
