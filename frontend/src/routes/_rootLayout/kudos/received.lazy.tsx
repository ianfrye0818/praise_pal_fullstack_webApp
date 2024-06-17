import { createLazyFileRoute } from '@tanstack/react-router';
import KudosCard from '@/components/kudos-card/kudos-card';
import useGetRecievedKudos from '@/hooks/api/useKudos/useGetReceivedKudos';
import { useAuth } from '@/hooks/useAuth';

export const Route = createLazyFileRoute('/_rootLayout/kudos/received')({
  component: () => <ReceivedPage />,
});

function ReceivedPage() {
  const { state } = useAuth();
  const { user } = state;
  const {
    data: kudos,
    isLoading,
    error,
  } = useGetRecievedKudos({
    companyId: user?.companyId as string,
    userId: user?.userId as string,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

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
