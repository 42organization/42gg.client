import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { errorState } from 'utils/recoil/error';
import ErrorPage from '../components/error/Error';

const Error = () => {
  const setErrorMessage = useSetRecoilState(errorState);

  useEffect(() => {
    setErrorMessage('DK404');
  }, []);
  return <ErrorPage />;
};

export default Error;
