import { useQuery } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const useScheduleGet = (url: string) => {
  const {
    data: schedule,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: 'schedule',
    queryFn: async () => {
      const res = await instanceInCalendar.get(url);
      return res.data || [];
    },
    retry: 1,
    enabled: true,
  });
  return { schedule, isLoading, isError, error };
};

export default useScheduleGet;
