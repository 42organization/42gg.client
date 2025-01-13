import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { Schedule } from 'types/calendar/scheduleTypes';
import { instanceInCalendar } from 'utils/axios';

const useScheduleRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const sendCalendarRequest = async <T>(
    method: 'POST' | 'PATCH' | 'PUT',
    url: string,
    body: Schedule,
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

  const createMutation = useMutation<T, Error, { url: string; data: Schedule }>(
    {
      mutationFn: ({ url, data }) => sendCalendarRequest<T>('POST', url, data),
      onSuccess: () => {
        queryClient.invalidateQueries('schedule');
      },
    }
  );

  const deleteMutation = useMutation<T, Error, { url: string; data: Schedule }>(
    {
      mutationFn: ({ url, data }) => sendCalendarRequest<T>('PATCH', url, data),
      onSuccess: () => {
        queryClient.invalidateQueries('schedule');
      },
    }
  );

  const updateMutation = useMutation<T, Error, { url: string; data: Schedule }>(
    {
      mutationFn: ({ url, data }) => sendCalendarRequest<T>('PUT', url, data),
      onSuccess: () => {
        queryClient.invalidateQueries('schedule');
      },
    }
  );

  return {
    createMutation,
    deleteMutation,
    updateMutation,
    data,
    status,
    error,
  };
};

export default useScheduleRequest;
