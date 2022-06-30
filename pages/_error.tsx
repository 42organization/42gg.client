import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { errorState } from 'utils/recoil/error';
import Errorpage from 'components/ErrorPage';

const Error = () => {
  const setErrorMessage = useSetRecoilState(errorState);
  const router = useRouter();

  useEffect(() => {
    setErrorMessage('Request Error');
    router.replace(`/`);
  }, []);
  return <Errorpage />;
};

export default Error;
