import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from './useShowSnackbar';

export const useAdminCalendarDelete = () => {
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const deleteCalendar = useCallback(
    async (calendarId: number) => {
      setLoading(true);
      try {
        const url = `/admin/public/${calendarId}`;

        const response = await instanceInCalendar.patch(url);

        if (response.status >= 200 && response.status < 300) {
          showSnackbar('success', '✅ 일정이 성공적으로 삭제되었습니다!');
          return true;
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', `❌ 일정 삭제 실패: ${axiosError.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
      return false;
    },
    [showSnackbar]
  );

  return { isLoading, deleteCalendar };
};
