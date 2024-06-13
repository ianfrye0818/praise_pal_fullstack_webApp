import { Kudo } from '@/types';
import { redirect } from 'next/navigation';
import { apiClient } from '@/axios-api/axios-clients';
import KudosCard from '@/components/kudos-card';
import NoKudos from './_components/no-kudos';
import { getSessionUser } from '@/auth/auth-actions';

async function fetchAllCompanyKudos(companyId: string): Promise<Kudo[]> {
  try {
    const response = await apiClient.get<Kudo[]>(`/kudos/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('an error occrured fetching kudos');
    return [];
  }
}

export default async function HomePage() {
  const user = await getSessionUser();
  console.error('serverside user', user);
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
