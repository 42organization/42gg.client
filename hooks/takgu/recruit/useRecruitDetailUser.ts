import { useQuery } from 'react-query';
import { IRecruitmentDetailUser } from 'types/takgu/recruit/recruitments';
import { instance } from 'utils/axios';

const useRecruitDetailUser = (recruitId: number, applicationId: number) => {
  const { data, isLoading } = useQuery<IRecruitmentDetailUser>({
    queryKey: ['recruitDetailUser', recruitId, applicationId],
    queryFn: async () => {
      const res = await instance.get(
        `/recruitments/${recruitId}/applications/${applicationId}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
};

export default useRecruitDetailUser;
