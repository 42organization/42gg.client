import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { PartyGameTemplate, PartyTemplateForm } from 'types/partyTypes';
import { instance, instanceInPartyManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

type templateResponse = {
  templateList: PartyGameTemplate[];
};

export function usePartyTemplate(categoryName?: string) {
  const queryClient = useQueryClient();
  const setSnackBar = useSetRecoilState(toastState);

  const { data } = useQuery({
    queryKey: 'partyGameTemplate',
    queryFn: () =>
      instance
        .get<templateResponse>('/party/templates')
        .then(({ data }) => data.templateList),
    onError: () => {
      setSnackBar({
        toastName: 'GET request',
        message: '템플릿을 가져오는데 실패했습니다.',
        severity: 'error',
        clicked: true,
      });
    },
    staleTime: 5 * 60 * 1000, // 5분
  });

  const createMutation = useMutation(
    (templateForm: PartyTemplateForm) =>
      instanceInPartyManage.post('/templates', templateForm),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyGameTemplate');
      },
    }
  );
  const updateMutation = useMutation(
    (template: PartyGameTemplate) =>
      instanceInPartyManage.patch(
        `/templates/${template.gameTemplateId}`,
        template
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyGameTemplate');
      },
    }
  );
  const deleteMutation = useMutation(
    (gameTemplateId: number) =>
      instanceInPartyManage.delete(`/templates/${gameTemplateId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyGameTemplate');
      },
    }
  );
  return {
    templates: data
      ? categoryName
        ? data.filter((d) => d.categoryName === categoryName)
        : data
      : [], // undefind 대신 []을 이용해 에러 처리
    createTemplate: (template: PartyTemplateForm) =>
      createMutation.mutate(template),
    updateTemplate: (template: PartyGameTemplate) =>
      updateMutation.mutate(template),
    deleteTemplate: ({ gameTemplateId }: { gameTemplateId: number }) =>
      deleteMutation.mutate(gameTemplateId),
  };
}
