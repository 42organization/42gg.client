import { useQuery } from 'react-query';
import { recruitmentResult } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

const useGetRecruitResult = (recruitId: string, applicantId?: number) => {
  const { data, isLoading, isError } = useQuery<recruitmentResult>({
    queryKey: ['recruitResult', recruitId],
    queryFn: async () => {
      // applicantId가 없는 경우에는 불러올 지원 결과가 없다.
      if (!applicantId) {
        return {
          title: null,
          status: null,
          interviewDate: null,
        };
      }
      const res = await mockInstance.get(
        `/recruitments/${recruitId}/applications/${applicantId}/result`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useGetRecruitResult;
