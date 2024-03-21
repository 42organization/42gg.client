import { useQuery } from 'react-query';
import { IRecruitmentDetailUser } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

const useRecruitDetailUser = (recruitId: number, applicationId: number) => {
  const { data, isLoading } = useQuery<IRecruitmentDetailUser>({
    queryKey: ['recruitDetailUser', recruitId, applicationId],
    queryFn: async () => {
      const res = await mockInstance.get(
        `/recruitments/${recruitId}/applications/${applicationId}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
};

export default useRecruitDetailUser;
