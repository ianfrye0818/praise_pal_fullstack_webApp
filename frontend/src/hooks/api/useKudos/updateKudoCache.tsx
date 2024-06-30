import { QueryClient } from '@tanstack/react-query';
import { TKudos } from '@/types';

interface CacheUpdateProps<T> {
  queryClient: QueryClient;
  companyId: string;
  kudoId?: string;
  payload?: T;
}

export function updateKudosCache<T extends { id?: string }>({
  queryClient,
  companyId,
  kudoId,
  payload,
}: CacheUpdateProps<T>) {
  const { hiddenKudosKey, nonHiddenKudosKey, previousHiddenKudos, previousNonHiddenKudos } =
    getPreviousKudos(queryClient, companyId);

  if (previousHiddenKudos) {
    queryClient.setQueryData(hiddenKudosKey, (old: TKudos[] | undefined) => {
      if (!old) return [];
      const updatedKudos = old
        .map((kudo) => {
          if (kudoId && kudo.id === kudoId) return { ...kudo, ...payload };
          if (payload && kudo.id === payload.id) return { ...kudo, ...payload };
          return kudo;
        })
        .filter((kudo) => !kudoId || kudo.id !== kudoId);
      console.log(' hidden kudos: ', { updatedKudos });
      return updatedKudos;
    });
  }

  if (previousNonHiddenKudos) {
    queryClient.setQueryData(nonHiddenKudosKey, (old: TKudos[] | undefined) => {
      if (!old) return [];
      const updatedKudos = old
        .map((kudo) => {
          if (kudoId && kudo.id === kudoId) return { ...kudo, ...payload };
          if (payload && kudo.id === payload.id) return { ...kudo, ...payload };
          return kudo;
        })
        .filter((kudo) => !kudoId || kudo.id !== kudoId);

      console.log('non hidden kudos: ', { updatedKudos });
      return updatedKudos;
    });
  }

  return { previousHiddenKudos, previousNonHiddenKudos };
}

export function getPreviousKudos(queryClient: QueryClient, companyId: string) {
  const hiddenKudosKey = ['kudos', companyId, true];
  const nonHiddenKudosKey = ['kudos', companyId, false];

  const previousHiddenKudos = queryClient.getQueryData<TKudos[]>(hiddenKudosKey);
  const previousNonHiddenKudos = queryClient.getQueryData<TKudos[]>(nonHiddenKudosKey);

  return { previousHiddenKudos, previousNonHiddenKudos, hiddenKudosKey, nonHiddenKudosKey };
}
