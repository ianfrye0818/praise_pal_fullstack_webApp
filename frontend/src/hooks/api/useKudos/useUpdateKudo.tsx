import { patchUpdateKudo } from '@/api/api-handlers';
import { TKudos } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateKudoProps {
  updatedKudo: Partial<TKudos>;
  companyId: string;
  kudoId: string;
}

export default function useUpdateKudo({ companyId, kudoId, updatedKudo }: UpdateKudoProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['singleKudo', kudoId],
    mutationFn: async () => await patchUpdateKudo(companyId, kudoId, updatedKudo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['singleKudo', kudoId] });
    },
  });

  return mutation;
}
