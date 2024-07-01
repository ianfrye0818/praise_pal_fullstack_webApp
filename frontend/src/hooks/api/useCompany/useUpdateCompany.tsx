import { patchUpdateCompany } from '@/api/api-handlers';
import { COMPANY_QUERY_OPTIONS } from '@/constants';
import { UpdateCompanyProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateCompany() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: UpdateCompanyProps) => patchUpdateCompany(payload),
    onMutate: async (updatedCompany) => {
      await queryClient.cancelQueries(COMPANY_QUERY_OPTIONS);

      const previousData = queryClient.getQueriesData(COMPANY_QUERY_OPTIONS);

      queryClient.setQueriesData(COMPANY_QUERY_OPTIONS, (old: any) => {
        return { ...old, ...updatedCompany };
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueriesData(COMPANY_QUERY_OPTIONS, context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(COMPANY_QUERY_OPTIONS);
    },
  });
  return mutation;
}
