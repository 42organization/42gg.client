import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { PartyGameTemplate, PartyTemplateForm } from 'types/partyTypes';
import { isAxiosError } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';

export function usePartyTemplate({ categoryId }: { categoryId?: number }) {
  const queryClient = useQueryClient();
  const setError = useSetRecoilState(errorState);

  const { data } = useQuery({
    queryKey: 'partyGameTemplate',
    queryFn: () =>
      mockInstance
        .get('/party/templates')
        .then(({ data }: { data: PartyGameTemplate[] }) => {
          return categoryId
            ? data.filter((d) => d.categoryId === categoryId)
            : data;
        }),
    onError: (e: unknown) => {
      // error처리 보류
      if (isAxiosError(e)) setError(`${e.code}: ${e.message}`);
    },
  });

  const createMutation = useMutation(
    (templateForm: PartyTemplateForm) =>
      mockInstance.post('/party/admin/templates', templateForm),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyGameTemplate');
      },
    }
  );
  const updateMutation = useMutation(
    (template: PartyGameTemplate) =>
      mockInstance.patch(
        `/party/admin/templates/${template.gameTemplateId}`,
        template
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyGameTemplate');
      },
    }
  );
  const deleteMutation = useMutation(
    (templateId: number) =>
      mockInstance.delete(`/party/admin/templates/${templateId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyGameTemplate');
      },
    }
  );

  return {
    templates: data ?? [], // undefind 대신 []을 이용해 에러 처리
    createTemplate: (templateId: number) => deleteMutation.mutate(templateId),
    updateTemplate: (template: PartyGameTemplate) =>
      updateMutation.mutate(template),
    deleteTemplate: (template: PartyTemplateForm) =>
      createMutation.mutate(template),
  };
}
