import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';

export const useErrorPage = () => {
  const [error, setError] = useRecoilState(errorState);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/`);
  }, []);

  const goHome = () => {
    setError('');
    router.push('/');
  };

  return { error, goHome };
};

export default useErrorPage;
