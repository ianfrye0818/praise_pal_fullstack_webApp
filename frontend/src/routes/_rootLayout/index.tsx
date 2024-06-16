import KudosCard from '@/components/kudos-card/kudos-card';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { testKudos } from '@/data';
import { getCompanyKudos } from '@/api/api-handlers';

export const Route = createFileRoute('/_rootLayout/')({
  loader: ({ context }) => getCompanyKudos(context.auth.user?.companyId),
  component: () => <HomePage />,
});

function HomePage() {
  //TODO: Implement the useLoaderData hook to get the kudos from the server
  // const kudos = useLoaderData({ from: '/_rootLayout/' });
  const kudos = testKudos;
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
