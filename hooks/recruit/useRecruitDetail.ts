import { useQuery } from 'react-query';
import { IRecruitmentDetail } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

const useRecruitDetail = (recruitId: number) => {
  const { data, isLoading } = useQuery<IRecruitmentDetail>({
    queryKey: ['recruitDetail', recruitId],
    queryFn: async () => {
      if (Number.isNaN(recruitId)) return null;
      const res = await mockInstance.get(`/recruitments/${recruitId}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
};

export default useRecruitDetail;
