import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { mockInstance } from 'utils/mockAxios';

const useCheckRecruit = () => {
  const [isRecruiting, setIsRecruiting] = useState<boolean>(false);
  const { data } = useQuery(['checkRecruit'], async () => {
    const res = await mockInstance.get('/recruitments');
    return res.data;
  });
  useEffect(() => {
    if (data && data.recruitments) setIsRecruiting(true);
    else setIsRecruiting(false);
  }, [data]);
  return { isRecruiting };
};

export default useCheckRecruit;
