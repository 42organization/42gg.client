import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { instance } from 'utils/axios';

const useCheckRecruit = () => {
  const [isRecruiting, setIsRecruiting] = useState<boolean>(false);
  const { data, isLoading } = useQuery({
    queryKey: ['checkRecruit'],
    staleTime: 1000 * 60 * 5, // 5분
    queryFn: async () => {
      const res = await instance.get('/recruitments');
      return res.data;
    },
  });
  useEffect(() => {
    if (data && data.recruitments && data.recruitments.length !== 0)
      setIsRecruiting(true);
    else setIsRecruiting(false);
  }, [data]);
  return { isRecruiting, isLoading };
};

export default useCheckRecruit;
