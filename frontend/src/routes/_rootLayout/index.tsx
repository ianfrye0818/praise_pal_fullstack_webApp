import KudosCard from '@/components/kudos-card/kudos-card';
import { useLoaderData, createFileRoute } from '@tanstack/react-router';
import { getCompanyKudos } from '@/api/api-handlers';
import { TKudos } from '@/types';

export const Route = createFileRoute('/_rootLayout/')({
  loader: async ({ context }) =>
    await getCompanyKudos({ companyId: context.state.user?.companyId as string, isHidden: false }),
  component: () => <HomePage />,
});

function HomePage() {
  // const { data: kudos, error, isLoading } = useGetCompanyKudos(user?.companyId as string);
  const kudos = useLoaderData({ from: '/_rootLayout/' }) as TKudos[];

  if (!kudos || !kudos.length) return <div>No Kudos</div>;
  return (
    <div>
      {kudos.map((kudo) => (
        <KudosCard
          key={kudo.id}
          kudo={kudo}
        />
      ))}
    </div>
  );
}

export default Route;
