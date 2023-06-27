import { NextRouter, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';

type useLoginCheckReturn = [boolean, boolean, boolean];

const useLoginCheck = (): useLoginCheckReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useRecoilState<boolean>(loginState);
  const [firstVisited, setFirestVisited] =
    useRecoilState<boolean>(firstVisitedState);
  const router: NextRouter = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('login') || '';
    if (token) {
      localStorage.removeItem('login');
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
