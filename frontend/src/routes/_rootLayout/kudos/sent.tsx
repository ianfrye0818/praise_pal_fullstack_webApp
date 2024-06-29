import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import KudosCard from '@/components/kudos-card/kudos-card';
import { TKudos } from '@/types';
import { getCompanyKudos } from '@/api/api-handlers';

export const Route = createFileRoute('/_rootLayout/kudos/sent')({
  loader: async ({ context }) =>
    getCompanyKudos({
      companyId: context.state.user?.companyId as string,
      isHidden: false,
      senderId: context.state.user?.userId as string,
    }),
  component: () => <SentPage />,
});

function SentPage() {
  const kudos = useLoaderData({ from: '/_rootLayout/kudos/sent' }) as TKudos[];

  if (!kudos || kudos.length === 0) return <div>No kudos found</div>;

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
