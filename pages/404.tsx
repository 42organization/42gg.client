import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/takgu/recoil/error';
import ErrorPage from 'components/takgu/error/Error';

const Error = () => {
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    setError('DK404');
  }, []);
  return <ErrorPage />;
};

export default Error;
