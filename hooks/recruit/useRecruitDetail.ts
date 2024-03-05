import { useQuery } from 'react-query';
import { IRecruitmentDetail } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

const useRecruitDetail = ({ id }: { id: number }) => {
  const { data, isLoading } = useQuery<IRecruitmentDetail>(
    ['recruitDetail', id],
    async () => {
      const res = await mockInstance.get(`/recruitments/${id}`);
      return res.data;
    }
  );

  return { data, isLoading };
};

export default useRecruitDetail;
