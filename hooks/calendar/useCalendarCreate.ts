import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { CalendarFormData } from 'types/calendar/formType';
import { instanceInCalendar } from 'utils/axios';
import { CalendarClassification } from 'constants/calendar/calendarConstants';
import { useShowSnackbar } from 'hooks/calendar/admin/useShowSnackbar';

export const useCalendarCreate = () => {
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const createCalendar = useCallback(
    async (formData: CalendarFormData) => {
      setLoading(true);

      try {
        const url =
          formData.classificationTag === CalendarClassification.EVENT
            ? 'public/event'
            : 'public/job';

        const requestData =
          formData.classificationTag === CalendarClassification.EVENT
            ? {
                eventTag: formData.eventTag,
                author: formData.author,
                title: formData.title,
                content: formData.content,
                link: formData.link || '',
                startTime: formData.startDate.toISOString(),
                endTime: formData.endDate.toISOString(),
              }
            : {
                jobTag: formData.jobTag,
                techTag: formData.techTag,
                author: formData.author,
                title: formData.title,
                content: formData.content,
                link: formData.link || '',
                startTime: formData.startDate.toISOString(),
                endTime: formData.endDate.toISOString(),
              };

        const res = await instanceInCalendar.post(url, requestData);

        if (res.status >= 200 && res.status < 300) {
          showSnackbar('success', '✅ 공유 일정이 성공적으로 등록되었습니다!');
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', `❌ 공유 일정 등록 실패: ${axiosError.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  return { isLoading, createCalendar };
};
