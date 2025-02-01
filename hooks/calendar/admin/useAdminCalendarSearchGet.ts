import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from './useShowSnackbar';

interface SearchGetCallbackProps {
  type: string;
  content: string;
  startTime?: string;
  endTime?: string;
}

export const useAdminCalendarSearchGet = () => {
  const [data, setData] = useState<Schedule[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const adminCalendarSearchGet = useCallback(
    async ({ type, content, startTime, endTime }: SearchGetCallbackProps) => {
      setIsLoading(true);
      if (!startTime) startTime = '2024-12-25';
      if (!endTime) {
        const today = new Date();
        endTime = today.toISOString().split('T')[0];
      }
      const searchUrl = `admin/calendar/search?type=${type}&content=${content}&startTime=${startTime}&endTime=${endTime}`;
      try {
        const res = await instanceInCalendar.get(searchUrl);
        if (200 <= res.status && res.status < 300) {
          setData(res.data.totalScheduleAdminResDtoList);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', axiosError.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [showSnackbar]
  );

  return { data, isLoading, adminCalendarSearchGet };
};
