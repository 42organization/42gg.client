import { useState } from 'react';
import { useMutation } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const usePublicScheduleRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const sendCalendarRequest = async <T>(
    method: 'POST' | 'PATCH' | 'PUT',
    url: string,
    body: Record<string, any>,
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
    { url: string; data: Record<string, any> }
  >({
    mutationFn: ({ url, data }) => sendCalendarRequest<T>('POST', url, data),
  });

  const deleteMutation = useMutation<
    T,
    Error,
    { url: string; data: Record<string, any> }
  >({
    mutationFn: ({ url, data }) => sendCalendarRequest<T>('PATCH', url, data),
  });

  const updateMutation = useMutation<
    T,
    Error,
    { url: string; data: Record<string, any> }
  >({
    mutationFn: ({ url, data }) => sendCalendarRequest<T>('PUT', url, data),
  });

  return {
    createMutation,
    deleteMutation,
    updateMutation,
    data,
    status,
    error,
  };
};

export default usePublicScheduleRequest;
