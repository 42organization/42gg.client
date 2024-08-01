import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';

const useErrorPage = () => {
  const [error, setError] = useRecoilState(errorState);
  const router = useRouter();
  const home = '/' + router.asPath.split('/')[1];

  const goHome = () => {
    setError('');
    router.push('/');
  };

  useEffect(() => {
    router.replace(home);
  }, []);

  return { error, goHome };
};

export default useErrorPage;
