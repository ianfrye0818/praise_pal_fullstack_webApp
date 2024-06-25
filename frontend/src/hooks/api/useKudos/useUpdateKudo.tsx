import { patchUpdateKudo } from '@/api/api-handlers';
import { UpdateKudoProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ companyId, payload }: { companyId: string; payload: UpdateKudoProps }) => {
      console.log(payload);
      await patchUpdateKudo(companyId, payload);
    },
    onMutate: async ({ payload }) => {
      const previousKudos = queryClient.getQueryData(['kudos']);
      queryClient.setQueryData(['kudos'], (old: any) => {
        return old.map((kudo: any) => {
          if (kudo.id === payload.id) {
            return {
              ...kudo,
              ...payload,
            };
          }
          return kudo;
        });
      });
      return { previousKudos };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['kudos'], context?.previousKudos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kudos'] });
    },
  });

  return mutation;
}
