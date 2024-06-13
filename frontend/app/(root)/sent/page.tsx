import KudosCard from '@/components/kudos-card';
import { Kudo } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react';
import NoKudos from '../_components/no-kudos';
import { apiClient } from '@/axios-api/axios-clients';
import { getSessionUser } from '@/auth/auth-actions';

async function fetchSentKudos(companyId: string, userId: string): Promise<Kudo[]> {
  const response = await apiClient.get<Kudo[]>(`/kudos/${companyId}/sender/${userId}`);
  return response.data;
}

export default async function SentPage() {
  const user = await getSessionUser();
  if (!user) redirect('/sign-in');
  const sentKudos = await fetchSentKudos(user.companyId, user.companyId);
  if (sentKudos.length === 0) return <NoKudos />;

  return (
    <div className='container mx-auto'>
      <h1>Sent Kudos</h1>
      {sentKudos.map((kudo) => (
        <KudosCard
          key={kudo.id}
          kudo={kudo}
        />
      ))}
    </div>
  );
}
