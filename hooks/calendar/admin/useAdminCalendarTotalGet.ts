import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { AdminCalendarResponse } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from 'hooks/calendar/admin/useShowSnackbar';

export const useAdminCalendarTotalGet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const adminCalendarTotalGet = useCallback(
    async (pageNumber: number): Promise<AdminCalendarResponse | null> => {
      setIsLoading(true);
      try {
        const res = await instanceInCalendar.get<AdminCalendarResponse>(
          `admin/calendar/total?page=${pageNumber}&size=10`
        );
        if (200 <= res.status && res.status < 300) {
          return res.data;
        } else {
          return null;
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', axiosError.message);
        console.error(err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [showSnackbar]
  );

  return { isLoading, adminCalendarTotalGet };
};
