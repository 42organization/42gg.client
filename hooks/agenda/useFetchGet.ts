import { useEffect, useState , useCallback } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchGet = <T>(url: string, params?: Record<string, any>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const getData = useCallback(async () => {
    if (params && params.agenda_key === undefined) {
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
  }, [url, params]);

  useEffect(() => {
    // URL이 있고 params가 없거나, agenda_key가 있는 경우에도 getData 호출 가능
    if (url && (!params || (params && params.agenda_key))) {
      getData(); // 조건에 맞을 때만 getData 호출
    }
  }, [url, JSON.stringify(params)]);

  return { data, status, error, getData };
};

export default useFetchGet;
