import { useQuery } from 'react-query';
import { IRecruitmentDetail } from 'types/recruit/recruitments';
import { instance } from 'utils/axios';

const useRecruitDetail = (recruitId: number) => {
  const { data, isLoading } = useQuery<IRecruitmentDetail>({
    queryKey: ['recruitDetail', recruitId],
    queryFn: async () => {
      if (Number.isNaN(recruitId)) return null;
      const res = await instance.get(`/recruitments/${recruitId}`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
};

export default useRecruitDetail;
