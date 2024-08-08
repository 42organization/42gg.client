import { useEffect, useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchDataGet = <T>(url: string, agendaKey: string) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (agendaKey) {
        try {
          const res = await instanceInAgenda.get(url);
          setStatus(res.status);
          if (res.status === 200) {
            setData(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [url, agendaKey]);

  return { data, status };
};

export default useFetchDataGet;
