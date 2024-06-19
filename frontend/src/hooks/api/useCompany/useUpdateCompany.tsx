import { patchUpdateCompany } from '@/api/api-handlers';
import { Company, UpdateCompanyProps } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateCompanyProps {
  companyId: string;
  payload: UpdateCompanyProps;
}

export default function useUpdateCompany({ companyId, payload }: UseUpdateCompanyProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => patchUpdateCompany(companyId, payload),
    onMutate: async (updatedCompany: UpdateCompanyProps) => {
      await queryClient.cancelQueries({ queryKey: ['company', companyId] });

      const previousData = queryClient.getQueryData(['company', companyId]);

      queryClient.setQueryData(['company', companyId], (old: Company) => {
        return { ...old, ...updatedCompany };
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['company', companyId], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['company', companyId] });
    },
  });
  return mutation;
}
