import { useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (
    method: 'POST' | 'PATCH',
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void
  ) => {
    try {
      const res = await instanceInAgenda.request({
        method,
        url,
        data: body,
        params,
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

  return { data, status, error, sendRequest };
};

export default useFetchRequest;
