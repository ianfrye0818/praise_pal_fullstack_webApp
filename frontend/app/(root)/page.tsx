import { TKudos } from '@/types';
import { redirect } from 'next/navigation';
import { apiClient } from '@/axios-api/axios-clients';
import KudosCard from '@/components/kudos-card';
import { getSessionUser } from '@/auth/auth-actions';
import NoKudos from './_components/no-kudos';

async function fetchAllCompanyKudos(companyId: string): Promise<TKudos[]> {
  try {
    const response = await apiClient.get<TKudos[]>(`/kudos/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('an error occrured fetching kudos');
    return [];
  }
}

export default async function HomePage() {
  const user = await getSessionUser();

  if (!user) redirect('/sign-in');
  const kudos = await fetchAllCompanyKudos(user.companyId);
  if (kudos.length === 0) return <NoKudos />;

  return (
    <div className='container mx-auto'>
      <h1>Welcome to Kudos</h1>
      {kudos.map((kudo) => (
        <KudosCard
          key={kudo.id}
          kudo={kudo}
        />
      ))}
    </div>
  );
}
