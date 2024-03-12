import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { PartyCategory } from 'types/partyTypes';
import { instance, instanceInPartyManage } from 'utils/axios';
import { toastState } from 'utils/recoil/toast';

export default function usePartyCategory() {
  const queryClient = useQueryClient();
  const setSnackBar = useSetRecoilState(toastState);

  const { data } = useQuery({
    queryKey: 'partyCategory',
    queryFn: () =>
      instance
        .get('/party/categories')
        .then(({ data }: { data: PartyCategory[] }) => data),
    onError: () => {
      setSnackBar({
        toastName: 'GET request',
        message: '카테고리를 가져오는데 실패했습니다.',
        severity: 'error',
        clicked: true,
      });
    },
  });

  const createMutation = useMutation(
    (categoryName: string) =>
      instanceInPartyManage.post('/categories', { categoryName }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyCategory');
      },
    }
  );
  const deleteMutation = useMutation(
    (categoryId: number) =>
      instanceInPartyManage.delete(`/categories/${categoryId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyCategory');
      },
    }
  );

  return {
    categories: data ?? [], // undefind 대신 []을 이용해 에러 처리
    deleteCategory: (categoryId: number) => deleteMutation.mutate(categoryId),
    createCategory: (categoryName: string) =>
      createMutation.mutate(categoryName),
  };
}
