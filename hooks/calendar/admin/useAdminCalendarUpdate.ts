import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { CalendarFormData } from 'types/calendar/formType';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from 'hooks/calendar/admin/useShowSnackbar';

export const useAdminCalendarUpdate = () => {
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const updateCalendar = useCallback(
    async (id: number, formData: CalendarFormData) => {
      setLoading(true);
      try {
        const url = `admin/public/${id}`;

        const requestData = {
          classification: formData.classificationTag,
          eventTag: formData.eventTag,
          jobTag: formData.jobTag,
          techTag: formData.techTag,
          title: formData.title,
          content: formData.content,
          link: formData.link || '',
          startTime: formData.startDate.toISOString(),
          endTime: formData.endDate.toISOString(),
        };

        const res = await instanceInCalendar.put(url, requestData);

        if (res.status >= 200 && res.status < 300) {
          showSnackbar('success', '✅ 일정이 성공적으로 수정되었습니다!');
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', `❌ 일정 수정 실패: ${axiosError.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  return { updateCalendar, isLoading };
};
