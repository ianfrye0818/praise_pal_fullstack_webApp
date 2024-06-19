import KudosCard from '@/components/kudos-card/kudos-card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import useGetCompanyKudos from '@/hooks/api/useKudos/useGetCompanyKudos';

export const Route = createLazyFileRoute('/_rootLayout/')({
  component: () => <HomePage />,
});

function HomePage() {
  const { user } = useAuth().state;
  const { data: kudos, error, isLoading } = useGetCompanyKudos(user?.companyId as string);

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
