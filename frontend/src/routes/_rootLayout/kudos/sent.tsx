import { getSentKudos } from '@/api/api-handlers';
import { createFileRoute } from '@tanstack/react-router';
import { testKudos } from '@/data';
import KudosCard from '@/components/kudos-card/kudos-card';

export const Route = createFileRoute('/_rootLayout/kudos/sent')({
  loader: ({ context }) => {
    if (!context.auth.user) return [];
    const { companyId, userId } = context.auth.user;
    return getSentKudos(companyId, userId);
  },
  component: () => <SentPage />,
});

function SentPage() {
  // const kudos = useLoaderData({from: '/_rootLayout/sent'})
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

function useLoaderData(arg0: { from: string }) {
  throw new Error('Function not implemented.');
}
