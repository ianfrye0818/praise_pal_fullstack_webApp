import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import KudosCard from '@/components/kudos-card/kudos-card';
import { getCompanyKudos } from '@/api/api-handlers';
import { TKudos } from '@/types';

export const Route = createFileRoute('/_rootLayout/kudos/received')({
  loader: async ({ context }) =>
    getCompanyKudos({
      companyId: context.state.user?.companyId as string,
      isHidden: false,
      receiverId: context.state.user?.userId as string,
    }),
  component: () => <ReceivedPage />,
});

function ReceivedPage() {
  const kudos = useLoaderData({ from: '/_rootLayout/kudos/received' }) as TKudos[];
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
