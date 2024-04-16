import { useQuery } from 'react-query';
import { recruitmentResult } from 'types/recruit/recruitments';
import { instance } from 'utils/axios';

const useGetRecruitResult = (recruitId: string, applicationId?: number) => {
  const { data, isLoading, isError } = useQuery<recruitmentResult>({
    queryKey: ['recruitResult', recruitId],
    queryFn: async () => {
      // applicationId가 없는 경우에는 불러올 지원 결과가 없다.
      if (!applicationId) {
        return {
          title: null,
          status: null,
          interviewDate: null,
        };
      }
      const res = await instance.get(
        `/recruitments/${recruitId}/applications/${applicationId}/result`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};

export default useGetRecruitResult;
