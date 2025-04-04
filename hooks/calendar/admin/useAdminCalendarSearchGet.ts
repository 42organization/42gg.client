import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { AdminSchedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from './useShowSnackbar';

interface SearchGetCallbackProps {
  type: string;
  content: string;
  startTime?: string;
  endTime?: string;
}

export const useAdminCalendarSearchGet = () => {
  const [data, setData] = useState<AdminSchedule[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const adminCalendarSearchGet = useCallback(
    async ({
      type,
      content,
      startTime,
      endTime,
    }: SearchGetCallbackProps): Promise<AdminSchedule[] | null> => {
      setIsLoading(true);
      if (!startTime) startTime = '2024-12-25';
      if (!endTime) {
        const today = new Date();
        endTime = today.toISOString().split('T')[0];
      }
      const searchUrl = `admin/search?type=${type}&content=${content}&startTime=${startTime}&endTime=${endTime}`;
      try {
        const res = await instanceInCalendar.get(searchUrl);
        if (200 <= res.status && res.status < 300) {
          const resultData = res.data.totalScheduleAdminResDtoList;
          setData(resultData);
          return resultData;
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', axiosError.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
      return null;
    },
    [showSnackbar]
  );

  return { data, isLoading, adminCalendarSearchGet };
};
