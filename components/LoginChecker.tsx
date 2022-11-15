import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';
// import Load from 'pages/load';
import Login from 'pages/login';
import WelcomeModal from './modal/event/WelcomeModal';
import styles from 'styles/Layout/Layout.module.scss';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const [firstVisited, setFirstVisited] = useRecoilState(firstVisitedState);

  const router = useRouter();
  const presentPath = router.asPath;
  const token = presentPath.split('?token=')[1];

  useEffect(() => {
    if (token) {
      localStorage.setItem('42gg-token', token);
      setFirstVisited(true);
      router.replace(`/`);
    }
    if (localStorage.getItem('42gg-token')) {
      setLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  return loggedIn ? (
    <>
      {firstVisited && <WelcomeModal />}
      {children}
    </>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
    </div>
  );

  // return (
  //   <div className={styles.appContainer}>
  //     <div className={styles.background}>{!isLoading && <Load />}</div>
  //   </div>
  // );
}
