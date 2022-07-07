import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { errorState } from 'utils/recoil/error';
import ErrorPage from 'components/ErrorPage';

const Error = () => {
  const setErrorMessage = useSetRecoilState(errorState);
  const router = useRouter();

  useEffect(() => {
    setErrorMessage('DK404');
  }, []);
  return <ErrorPage />;
};

export default Error;
