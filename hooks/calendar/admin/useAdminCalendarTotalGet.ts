import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { AdminSchedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from './useShowSnackbar';

export const useAdminCalendarTotalGet = () => {
  const [data, setData] = useState<AdminSchedule[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const adminCalendarTotalGet = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await instanceInCalendar.get('admin/calendar/total');
      if (200 <= res.status && res.status < 300) {
        setData(res.data.totalScheduleAdminResDtoList || []);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      showSnackbar('error', axiosError.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [showSnackbar]);

  return { data, isLoading, adminCalendarTotalGet };
};
