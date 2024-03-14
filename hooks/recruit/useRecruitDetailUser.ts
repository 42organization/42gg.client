import { useQuery } from 'react-query';
import {
  ApplicationFormType,
  IRecruitmentDetailUser,
} from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';

const useRecruitDetailUser = ({
  recruitId,
  applicationId,
  mode,
}: {
  recruitId: number;
  applicationId: number;
  mode: ApplicationFormType;
}) => {
  const { data, isLoading } = useQuery<IRecruitmentDetailUser>({
    queryKey: ['recruitDetailUser', recruitId, applicationId],
    queryFn: async () => {
      const res = await mockInstance.get(
        `/recruitments/${recruitId}/applications/${applicationId}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
    enabled: mode === 'APPLY' ? false : true,
  });
  return { data, isLoading };
};

export default useRecruitDetailUser;
