import { useEffect, useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchGet = <T>(url: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instanceInAgenda.get(url, { params });
        setStatus(res.status);
        if (res.status === 200 || res.status === 201) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
        setError('get error');
      }
    };

    if (url) {
      getData();
    }
  }, [url, JSON.stringify(params)]);

  return { data, status, error };
};

export default useFetchGet;
