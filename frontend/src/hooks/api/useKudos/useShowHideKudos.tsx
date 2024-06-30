import { patchUpdateKudo } from '@/api/api-handlers';
import { UpdateKudoProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPreviousKudos, updateKudosCache } from './updateKudoCache';

interface UseShowHideKudosProps {
  companyId: string;
  isHidden: boolean;
  kudoId: string;
  newIsHiddenValue: boolean;
}

export default function useShowHideKudo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      companyId,
      newIsHiddenValue,
      kudoId,
      isHidden,
    }: UseShowHideKudosProps) => {
      const payload: UpdateKudoProps = {
        isHidden: newIsHiddenValue,
        id: kudoId,
      };
      await patchUpdateKudo(companyId, payload);
    },
    onMutate: async ({ newIsHiddenValue, kudoId: updatedKudoId, companyId }) => {
      console.log({ newIsHiddenValue, updatedKudoId, companyId });
      return updateKudosCache<UpdateKudoProps>({
        companyId,
        queryClient,
        kudoId: updatedKudoId,
        payload: { isHidden: newIsHiddenValue, id: updatedKudoId },
      });
      // const previousKudos = queryClient.getQueryData(['kudos']);
      // queryClient.setQueryData(['kudos'], (old: any) => {
      //   return old.map((kudo: any) => {
      //     if (kudo.id === updatedKudoId) {
      //       return {
      //         ...kudo,
      //         ...{ isHidden: newIsHiddenValue },
      //       };
      //     }
      //     return kudo;
      //   });
      // });
      // return { previousKudos };
    },
    onError: (_, variables, context) => {
      if (context?.previousHiddenKudos) {
        queryClient.setQueryData(['kudos', variables.companyId, true], context.previousHiddenKudos);
      }
      if (context?.previousNonHiddenKudos) {
        queryClient.setQueryData(
          ['kudos', variables.companyId, false],
          context.previousNonHiddenKudos
        );
      }
    },
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: ['kudos', companyId], exact: false });
    },
  });

  return mutation;
}
