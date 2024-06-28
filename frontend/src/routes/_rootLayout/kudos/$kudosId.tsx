import KudosCard from '@/components/kudos-card/kudos-card';
import useGetSingleKudo from '@/hooks/api/useKudos/useGetSingleKudo';
import { useAuth } from '@/hooks/useAuth';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootLayout/kudos/$kudosId')({
  component: () => <SingleKudosPage />,
});

function SingleKudosPage() {
  const { kudosId } = Route.useParams();
  const { user: currentUser } = useAuth().state;

  const {
    data: kudo,
    error,
    isLoading,
  } = useGetSingleKudo({
    kudoId: kudosId,
    companyId: currentUser?.companyId as string,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!kudo) return <div>Not Found</div>;
  return (
    <div>
      <KudosCard
        kudo={kudo}
        commenting={true}
      />
    </div>
  );
}
