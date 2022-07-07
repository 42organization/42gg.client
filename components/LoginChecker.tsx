import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { loginState } from 'utils/recoil/login';
import { newLoginState } from 'utils/recoil/layout';
import { useRecoilState } from 'recoil';
import Login from 'pages/login';
import styles from 'styles/Layout/Layout.module.scss';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function ErrorChecker({ children }: LoginCheckerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [newLogin, setNewLogin] = useRecoilState(newLoginState);
  const router = useRouter();
  const presentPath = router.asPath;
  const token = presentPath.split('?token=')[1];

  useEffect(() => {
    if (token) localStorage.setItem('42gg-token', token);
    if (localStorage.getItem('42gg-token')) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (router.asPath.includes('token')) {
      setNewLogin(true);
      router.replace(`/`);
    }
  }, [token]);

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
    </div>
  );
}
