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
    retry: 1, //에러 났을때 1번 재시도
  });
  //console.log(schedule);
  return { schedule, isLoading, isError, error };
};

export default usePublicScheduleGet;
