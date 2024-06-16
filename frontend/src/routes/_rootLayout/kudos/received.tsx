import { createFileRoute } from '@tanstack/react-router';
import { testKudos } from '@/data';
import KudosCard from '@/components/kudos-card/kudos-card';
import { getReceivedKudos } from '@/api/api-handlers';

export const Route = createFileRoute('/_rootLayout/kudos/received')({
  loader: ({ context }) => {
    if (!context.auth.user) return [];
    const { companyId, userId } = context.auth.user;
    return getReceivedKudos(companyId, userId);
  },
  component: () => <ReceivedPage />,
});

function ReceivedPage() {
  // const kudos = useLoaderData({from: '/_rootLayout/received'})
  const kudos = testKudos;
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
