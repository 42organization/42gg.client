import { useQuery } from 'react-query';
import { instanceInCalendar } from '../../utils/axios';

const useScheduleGroupGet = (url: string) => {
  const {
    data: scheduleGroup,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['scheduleGroup', url],
    queryFn: async () => {
      const res = await instanceInCalendar.get(url);
      return res.data;
    },
    retry: 1,
  });
  return { scheduleGroup, isLoading, isError, error };
};

export default useScheduleGroupGet;
