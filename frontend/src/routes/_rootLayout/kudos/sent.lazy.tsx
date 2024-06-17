import { createLazyFileRoute } from '@tanstack/react-router';
import KudosCard from '@/components/kudos-card/kudos-card';
import { useAuth } from '@/hooks/useAuth';
import useGetSentKudos from '@/hooks/api/useKudos/useGetSentKudos';

export const Route = createLazyFileRoute('/_rootLayout/kudos/sent')({
  component: () => <SentPage />,
});

function SentPage() {
  const { state } = useAuth();
  const { user } = state;
  const {
    data: kudos,
    error,
    isLoading,
  } = useGetSentKudos({ companyId: user?.companyId as string, userId: user?.userId as string });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

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

function useLoaderData(arg0: { from: string }) {
  throw new Error('Function not implemented.');
}
