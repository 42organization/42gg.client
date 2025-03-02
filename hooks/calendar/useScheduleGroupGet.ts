import { useQuery } from 'react-query';
import { instanceInCalendar } from '../../utils/axios';

const useScheduleGroupGet = (url: string) => {
  const {
    data: scheduleGroup,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: 'scheduleGroup',
    queryFn: async () => {
      const res = await instanceInCalendar.get(url);
      return res.data.content || [];
    },
    retry: 1,
    enabled: true,
  });
  return { scheduleGroup, isLoading, isError, error };
};

export default useScheduleGroupGet;
