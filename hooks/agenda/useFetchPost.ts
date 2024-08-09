import { useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchPost = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const postData = async (
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>
  ) => {
    try {
      const res = await instanceInAgenda.post(url, body, { params });
      setStatus(res.status);
      if (res.status === 200 || res.status === 201) {
        setData(res.data);
      }
    } catch (error) {
      setError('post error');
      console.error(error);
    }
  };

  return { data, status, error, postData };
};

export default useFetchPost;
