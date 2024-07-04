import { NextRouter, useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/takgu/recoil/login';

type useLoginCheckReturn = [boolean, boolean];

const useLoginCheck = (): useLoginCheckReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useRecoilState<boolean>(loginState);
  const router: NextRouter = useRouter();
  const presentPath: string = router.asPath;
  const token: string = presentPath.split('?token=')[1];
  const refreshToken: string = Cookies.get('refresh_token') || '';

  useEffect(() => {
    if (token) {
      localStorage.setItem('42gg-token', token);
      setLoggedIn(true);
      router.replace('/');
    }
    if (refreshToken) {
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, []);
  return [isLoading, loggedIn];
};

export default useLoginCheck;
