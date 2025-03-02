// import { useState, useEffect } from "react";
// import { instanceInCalendar } from 'utils/axios';
// import { Schedule } from "types/calendar/scheduleTypes";
// import { startOfWeek, endOfWeek } from 'date-fns';

// const useMonthScheduleGet = (url: string, currentDate: Date) => {
//     const [schedule, setSchedule] = useState<Schedule[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchSchedule = async () => {
//             const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 9);
//             const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 9);

//             const startOfView = startOfWeek(startOfMonth);
//             const endOfView = endOfWeek(endOfMonth);

//             try {
//                 const res = await instanceInCalendar.get(
//                     `${url}?start=${startOfView.toISOString().split('T')[0]}&end=${endOfView.toISOString().split('T')[0]}`
//                 );
//                 const data = res.data || [];
//                 if (Array.isArray(data.content)) {
//                     setSchedule(data.content);
//                 } else {
//                     setSchedule([]);
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setError('An error occurred while fetching data');
//             }
//         };

//         fetchSchedule();

//     }, [currentDate, url]);

//     return { schedule, error };
// };

// export default useMonthScheduleGet;

import { startOfWeek, endOfWeek } from 'date-fns';
import { useQuery } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const useMonthScheduleGet = (url: string, currentDate: Date) => {
  const {
    data: schedule = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['schedule', url, currentDate.getTime()],
    queryFn: async () => {
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
        9
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        9
      );

      const startOfView = startOfWeek(startOfMonth);
      const endOfView = endOfWeek(endOfMonth);

      const res = await instanceInCalendar.get(
        `${url}?start=${startOfView.toISOString().split('T')[0]}&end=${
          endOfView.toISOString().split('T')[0]
        }`
      );

      const data = res.data || [];
      if (Array.isArray(data.content)) {
        return data.content;
      } else {
        return [];
      }
    },
    retry: 1,
    enabled: true,
  });
  return { schedule, isLoading, isError, error };
};

export default useMonthScheduleGet;
