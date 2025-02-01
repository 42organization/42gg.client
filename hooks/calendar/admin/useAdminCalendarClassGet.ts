import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { Schedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import { CalendarClassification } from 'constants/calendar/calendarConstants';
import { useShowSnackbar } from './useShowSnackbar';

export const useAdminCalendarClassGet = () => {
  const [data, setData] = useState<Schedule[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const adminCalendarClassGet = useCallback(
    async (classification: CalendarClassification) => {
      setLoading(true);
      const url = `admin/calendar/list/${classification}`;
      try {
        const res = await instanceInCalendar.get(url);
        if (200 <= res.status && res.status < 300) {
          setData(res.data.totalScheduleAdminResDtoList || []);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', axiosError.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  return { data, isLoading, adminCalendarClassGet };
};
