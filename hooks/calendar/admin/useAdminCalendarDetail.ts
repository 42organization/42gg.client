import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { AdminSchedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import { CalendarClassification } from 'constants/calendar/calendarConstants';
import { useShowSnackbar } from './useShowSnackbar';

export const useAdminCalendarDetail = () => {
  const [detailData, setDetailData] = useState<AdminSchedule | null>(null);
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const getCalendarDetail = useCallback(
    async (scheduleId: number, classification: CalendarClassification) => {
      setLoading(true);
      console.log(scheduleId, classification);
      try {
        let url = 'admin/';
        url +=
          classification === CalendarClassification.PRIVATE
            ? `private/${scheduleId}`
            : `public/${scheduleId}`;

        const res = await instanceInCalendar.get(url);
        if (200 <= res.status && res.status < 300) {
          setDetailData(res.data);
          console.log('res');
          console.log(res.data);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar(
          'error',
          `❌ 일정 세부사항 가져오기 실패: ${axiosError.message}`
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  return { detailData, isLoading, getCalendarDetail };
};
