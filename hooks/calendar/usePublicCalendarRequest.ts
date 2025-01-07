import { useState } from 'react';
import { useMutation } from 'react-query';
import { instanceInCalendar } from 'utils/axios';

const usePublicCalendarRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const sendCalendarRequest = async <T>(
    method: 'POST' | 'PATCH',
    url: string,
    body: Record<string, any>,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void
  ) => {
    try {
      console.log('받은 데이터: ', body);
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

  const postMutation = useMutation<
    T,
    Error,
    { url: string; data: Record<string, any> }
  >({
    mutationFn: ({ url, data }) =>
      sendCalendarRequest<T>(
        'POST',
        url,
        data,
        (response) => {
          console.log('Mutation Request successful', response);
        },
        (error) => {
          console.log('Mutation Request Error', error);
        }
      ),
  });

  return postMutation;
};

export default usePublicCalendarRequest;
