import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { PartyCategory } from 'types/partyTypes';
import { isAxiosError } from 'utils/axios';
import { mockInstance } from 'utils/mockAxios';
import { errorState } from 'utils/recoil/error';

export default function usePartyCategory() {
  const queryClient = useQueryClient();
  const setError = useSetRecoilState(errorState);

  const { data } = useQuery({
    queryKey: 'partyCategory',
    queryFn: () =>
      mockInstance
        .get('/party/categorys')
        .then(({ data }: { data: PartyCategory[] }) => data),
    onError: (e: unknown) => {
      // error처리 보류
      if (isAxiosError(e)) setError(`${e.code}: ${e.message}`);
    },
  });

  const createMutation = useMutation(
    (categoryName: string) =>
      mockInstance.post('/party/categorys', { categoryName }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyCategory');
      },
    }
  );
  const deleteMutation = useMutation(
    (categoryId: number) =>
      mockInstance.delete(`/party/categorys/${categoryId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('partyCategory');
      },
    }
  );

  return {
    categorys: data ?? [], // undefind 대신 []을 이용해 에러 처리
    deleteCategory: (categoryId: number) => deleteMutation.mutate(categoryId),
    createCategory: (categoryName: string) =>
      createMutation.mutate(categoryName),
  };
}
