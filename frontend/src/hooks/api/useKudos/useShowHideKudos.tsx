import { patchUpdateKudo } from '@/api/api-handlers';
import { UpdateKudoProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface useShowHideKudosProps {
  companyId: string;
  isHidden: boolean;
}

export default function useShowHideKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      companyId,
      newIsHiddenValue,
      kudoId,
      isHidden,
    }: {
      companyId: string;
      newIsHiddenValue: boolean;
      kudoId: string;
      isHidden: boolean;
    }) => {
      const payload: UpdateKudoProps = {
        isHidden: newIsHiddenValue,
        id: kudoId,
      };
      await patchUpdateKudo(companyId, payload);
    },
    onMutate: async ({ newIsHiddenValue, kudoId: updatedKudoId }) => {
      const previousKudos = queryClient.getQueryData(['kudos']);
      queryClient.setQueryData(['kudos'], (old: any) => {
        return old.map((kudo: any) => {
          if (kudo.id === updatedKudoId) {
            return {
              ...kudo,
              ...{ isHidden: newIsHiddenValue },
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
