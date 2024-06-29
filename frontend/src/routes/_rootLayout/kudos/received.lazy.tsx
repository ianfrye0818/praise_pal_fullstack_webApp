import { createLazyFileRoute, useLoaderData } from '@tanstack/react-router';
import KudosCard from '@/components/kudos-card/kudos-card';
import { TKudos } from '@/types';
import useGetCompanyKudos from '@/hooks/api/useKudos/useGetCompanyKudos';
import { useAuth } from '@/hooks/useAuth';

export const Route = createLazyFileRoute('/_rootLayout/kudos/received')({
  component: () => <ReceivedPage />,
});

function ReceivedPage() {
  const { user } = useAuth().state;
  const {
    data: kudos,
    isLoading,
    error,
  } = useGetCompanyKudos({
    companyId: user?.companyId as string,
    receiverId: user?.userId as string,
    isHidden: false,
  });

  //TODO: add loading and error components
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  //TODO: add no kudos found component
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
