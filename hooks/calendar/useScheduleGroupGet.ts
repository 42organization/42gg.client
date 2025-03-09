import { useQuery } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const useScheduleGroupGet = (url: string) => {
  const {
    data: scheduleGroup = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: 'scheduleGroup',
    queryFn: async () => {
      const res = await instanceInCalendar.get(url);
      const groupsWithChecked =
        res.data.content?.map((group: any) => ({
          ...group,
          checked: true,
        })) || [];
      return groupsWithChecked;
    },
    retry: 1,
    enabled: true,
  });
  return { scheduleGroup, isLoading, isError, error };
};

export default useScheduleGroupGet;
