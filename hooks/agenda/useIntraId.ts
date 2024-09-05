import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useIntraId = () => {
  const router = useRouter();
  const [intraId, setIntraId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      setIntraId(id);
    }
  }, [router.isReady, router.query.id]);

  return intraId;
};

export default useIntraId;
