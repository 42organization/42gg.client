import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';

const useErrorPage = () => {
  const [error, setError] = useRecoilState(errorState);
  const router = useRouter();

  const goHome = () => {
    setError('');
    router.push('/takgu');
  };

  useEffect(() => {
    router.replace(`/takgu`);
  }, []);

  return { error, goHome };
};

export default useErrorPage;
