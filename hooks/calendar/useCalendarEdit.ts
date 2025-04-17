import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { CalendarFormData } from 'types/calendar/formType';
import { instanceInCalendar } from 'utils/axios';
import { useShowSnackbar } from 'hooks/calendar/admin/useShowSnackbar';

export const useCalendarEdit = () => {
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const editCalendar = useCallback(
    async (id: number, formData: CalendarFormData) => {
      setLoading(true);

      try {
        const url = `public/${id}`;

        const requestData = {
          classification: formData.classificationTag,
          eventTag: formData.eventTag,
          jobTag: formData.jobTag,
          techTag: formData.techTag,
          author: formData.author,
          title: formData.title,
          content: formData.content,
          link: formData.link || '',
          startTime: formData.startDate.toISOString(),
          endTime: formData.endDate.toISOString(),
        };

        console.log(url, requestData);
        const res = await instanceInCalendar.put(url, requestData);

        if (res.status >= 200 && res.status < 300) {
          showSnackbar('success', '✅ 공유 일정이 성공적으로 수정 되었습니다!');
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', `❌ 공유 일정 수정 실패: ${axiosError.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  return { isLoading, editCalendar };
};
