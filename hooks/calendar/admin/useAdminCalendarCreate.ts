import { AxiosError } from 'axios';
import { useState, useCallback } from 'react';
import { CalendarFormData } from 'types/calendar/formType';
import { AdminSchedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';
import {
  CalendarClassification,
  CalendarStatus,
} from 'constants/calendar/calendarConstants';
import { useShowSnackbar } from './useShowSnackbar';

export const useAdminCalendarCreate = () => {
  const [data, setData] = useState<AdminSchedule[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const showSnackbar = useShowSnackbar();

  const createCalendar = useCallback(
    async (formData: CalendarFormData) => {
      setLoading(true);

      try {
        const url =
          formData.classificationTag === CalendarClassification.EVENT
            ? `admin/public/event`
            : `admin/public/job`;

        const requestData =
          formData.classificationTag === CalendarClassification.EVENT
            ? {
                eventTag: formData.eventTag,
                title: formData.title,
                content: formData.description,
                link: formData.link || '',
                status: CalendarStatus.ACTIVATE,
                startTime: formData.startDate.toISOString(),
                endTime: formData.endDate.toISOString(),
              }
            : {
                jobTag: formData.jobTag,
                techTag: formData.techTag,
                title: formData.title,
                content: formData.description,
                link: formData.link || '',
                status: CalendarStatus.ACTIVATE,
                startTime: formData.startDate.toISOString(),
                endTime: formData.endDate.toISOString(),
              };

        const response = await instanceInCalendar.post(url, requestData);

        if (response.status >= 200 && response.status < 300) {
          setData(response.data.totalScheduleAdminResDtoList || []);
          showSnackbar('success', '✅ 일정이 성공적으로 등록되었습니다!');
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        showSnackbar('error', `❌ 일정 등록 실패: ${axiosError.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar]
  );

  return { data, isLoading, createCalendar };
};
