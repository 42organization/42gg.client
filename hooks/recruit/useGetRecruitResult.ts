import { useQuery } from 'react-query';
import { recruitmentResult } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

const useGetRecruitResult = (recruitId: string) => {
  const { data, isLoading, isError } = useQuery<recruitmentResult>({
    queryKey: ['recruitResult', recruitId],
    queryFn: async () => {
      const res = await mockInstance.get(
        `/recruitments/${recruitId}/applications/result`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useGetRecruitResult;
