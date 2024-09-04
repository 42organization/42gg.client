import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from 'hooks/agenda/Layout/useUser';

const Index = () => {
  const router = useRouter();
  const { intraId } = useUser() || {};

  useEffect(() => {
    if (intraId) {
      router.push(`/agenda/profile/user?id=${intraId}`);
    } else {
      router.push(`/`);
    }
  }, [intraId, router]);

  return null;
};

export default Index;
