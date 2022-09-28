import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { modalState } from 'utils/recoil/modal';
import Load from 'pages/load';
// import Login from 'pages/login';
import styles from 'styles/Layout/Layout.module.scss';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const setModalInfo = useSetRecoilState(modalState);
  const router = useRouter();
  const presentPath = router.asPath;
  const token = presentPath.split('?token=')[1];

  useEffect(() => {
    if (token) {
      localStorage.setItem('42gg-token', token);
      setModalInfo({ modalName: 'MAIN-WELCOME' });
      router.replace(`/`);
    }
    if (localStorage.getItem('42gg-token')) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  return (
    // isLoggedIn ? (
    //   <>{children}</>
    // ) : (
    <div className={styles.appContainer}>
      {/* <div className={styles.background}>{!isLoading && <Login />}</div> */}
      <div className={styles.background}>{!isLoading && <Load />}</div>
    </div>
  );
  // );
}
