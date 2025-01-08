import { useQuery } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const usePublicScheduleGet = (url: string) => {
  const {
    data: schedule,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['schedule', url],
    queryFn: async () => {
      const res = await instanceInCalendar.get(url);
      return res.data;
    },
  });
  //console.log(schedule);
  return { schedule, isLoading, isError, error };
};

export default usePublicScheduleGet;
