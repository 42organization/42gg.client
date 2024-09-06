import { useEffect, useState, useCallback } from 'react';
import { instanceInAgenda } from 'utils/axios';

interface FetchGetProps {
  url: string;
  isReady?: boolean;
  params?: Record<string, any>;
}

const useFetchGet = <T>({ url, isReady = true, params }: FetchGetProps) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    if (isReady === false) {
      return;
    }

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
  }, [url, isReady, params]);

  useEffect(() => {
    if (url) {
      getData(); // 조건에 맞을 때만 getData 호출
    }
  }, [url, isReady, JSON.stringify(params)]);

  return { data, status, error, getData };
};

export default useFetchGet;
