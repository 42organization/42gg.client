import { NextRouter, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';
import Cookies from 'js-cookie';

type useLoginCheckReturn = [boolean, boolean, boolean];

const useLoginCheck = (): useLoginCheckReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useRecoilState<boolean>(loginState);
  const [firstVisited, setFirestVisited] =
    useRecoilState<boolean>(firstVisitedState);
  const router: NextRouter = useRouter();
  const presentPath: string = router.asPath;
  const token: string = presentPath.split('?token=')[1];
  const refreshToken: string = Cookies.get('refresh_token');

  useEffect(() => {
    if (token) {
	  localStorage.setItem('42gg-token', token);
	  setFirestVisited(true);
	  setLoggedIn(true);
      router.replace('/');
    }
	if (refreshToken) {
	  setLoggedIn(true);
	}
    setIsLoading(false);
  }, []);
  return [isLoading, loggedIn, firstVisited];
};

export default useLoginCheck;
