import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import ErrorPage from 'components/error/Error';

const Error = () => {
  const setError = useSetRecoilState(errorState);

  useEffect(() => {
    setError('DK404');
  }, []);
  return <ErrorPage />;
};

export default Error;
