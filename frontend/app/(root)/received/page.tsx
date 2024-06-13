import KudosCard from '@/components/kudos-card';
import { Kudo } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react';
import NoKudos from '../_components/no-kudos';

import { apiClient } from '@/axios-api/axios-clients';
import { getSessionUser } from '@/auth/auth-actions';

async function fetchReceivedKudos(companyId: string, userId: string): Promise<Kudo[]> {
  const response = await apiClient.get<Kudo[]>(`/kudos/${companyId}/recipient/${userId}`);
  return response.data;
}

export default async function ReceivedPage() {
  const user = await getSessionUser();
  if (!user) redirect('/sign-in');
  const receivedKudos = await fetchReceivedKudos(user.companyId, user.companyId);
  if (receivedKudos.length === 0) return <NoKudos />;

  return (
    <div className='container mx-auto'>
      <h1>Sent Kudos</h1>
      {receivedKudos.map((kudo) => (
        <KudosCard
          key={kudo.id}
          kudo={kudo}
        />
      ))}
    </div>
  );
}
