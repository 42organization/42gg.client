import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ScheduleGroup } from 'types/calendar/scheduleGroup';
import { instanceInCalendar } from 'utils/axios';

const useScheduleGroupRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const sendCalendarRequest = async <T>(
    method: 'POST' | 'DELETE' | 'PUT',
    url: string,
    body: ScheduleGroup,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void
  ) => {
    try {
      const res = await instanceInCalendar.request({
        method,
        url,
        data: body,
      });

      setStatus(res.status);

      if (res.status >= 200 && res.status < 300) {
        if (onSuccess) {
          onSuccess(res.data || null);
        }
        if (res.data) {
          setData(res.data);
        }
        return res.data;
      }
    } catch (error) {
      setError('request error');
      console.error(error);
      if (onError) {
        onError('request error');
      }
    }
  };

  const createMutation = useMutation<
    T,
    Error,
    { url: string; data: ScheduleGroup }
  >({
    mutationFn: ({ url, data }) => sendCalendarRequest<T>('POST', url, data),
    onSuccess: () => {
      queryClient.invalidateQueries('scheduleGroup');
    },
  });

  const deleteMutation = useMutation<
    T,
    Error,
    { url: string; data: ScheduleGroup }
  >({
    mutationFn: ({ url, data }) => sendCalendarRequest<T>('DELETE', url, data),
    onSuccess: () => {
      queryClient.invalidateQueries('scheduleGroup');
    },
  });

  const updateMutation = useMutation<
    T,
    Error,
    { url: string; data: ScheduleGroup }
  >({
    mutationFn: ({ url, data }) => sendCalendarRequest<T>('PUT', url, data),
    onSuccess: () => {
      queryClient.invalidateQueries('scheduleGroup');
    },
  });

  return { createMutation, deleteMutation, updateMutation };
};

export default useScheduleGroupRequest;
