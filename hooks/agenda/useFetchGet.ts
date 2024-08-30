import { useEffect, useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchGet = <T>(url: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const res = await instanceInAgenda.get(url, { params });
      setStatus(res.status);
      if (res.status >= 200 && res.status < 300 && res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
      setError('get error');
    }
  };

  useEffect(() => {
    if (url) {
      getData();
    }
  }, [url, JSON.stringify(params)]);

  return { data, status, error, getData };
};

export default useFetchGet;
