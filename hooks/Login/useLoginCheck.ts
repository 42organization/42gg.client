import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';

const useLoginCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const [firstVisited, setFirestVisited] = useRecoilState(firstVisitedState);

  const router = useRouter();
  const presentPath = router.asPath;
  const token = presentPath.split('?token=')[1];

  useEffect(() => {
    if (token) {
      localStorage.setItem('42gg-token', token);
      setFirestVisited(true);
      router.replace('/');
    }
    if (localStorage.getItem('42gg-token')) {
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  return [isLoading, loggedIn, firstVisited];
};

export default useLoginCheck;
