import { useState } from 'react';
import { instanceInAgenda } from 'utils/axios';

const useFetchPost = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const postData = async (
    url: string,
    body: Record<string, any>,
    params?: Record<string, any>,
    onSuccess?: (data: T) => void, // 성공 콜백
    onError?: (error: string) => void // 실패 콜백
  ) => {
    try {
      const res = await instanceInAgenda.post(url, body, { params });
      setStatus(res.status);
      if (res.status === 200 || res.status === 201 || res.status === 204) {
        setData(res.data);
        if (onSuccess) {
          onSuccess(res.data); // 성공 시 콜백 호출
        }
      }
    } catch (error) {
      setError('post error');
      console.error(error);
      if (onError) {
        onError('post error'); // 실패 시 콜백 호출
      }
    }
  };

  return { data, status, error, postData };
};

export default useFetchPost;
