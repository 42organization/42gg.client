import { useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchPatch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const patchData = async (
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>
  ) => {
    try {
      const res = await instanceInAgenda.patch(url, body, { params });
      setStatus(res.status);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      setError('patch error');
      console.error(error);
    }
  };

  return { data, status, error, patchData };
};

export default useFetchPatch;
