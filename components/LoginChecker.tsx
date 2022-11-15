import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';
import Load from 'pages/load';
// import Login from 'pages/login';
import WelcomeModal from './modal/event/WelcomeModal';
import styles from 'styles/Layout/Layout.module.scss';
import instance from 'utils/axios';
import { userState } from 'utils/recoil/layout';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const [firstVisited, setFirstVisited] = useRecoilState(firstVisitedState);
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();
  const presentPath = router.asPath;
  const token = presentPath.split('?token=')[1];

  const getUserHandler = async () => {
    try {
      const res = await instance.get(`/pingpong/users`);
      setUser(res?.data);
      console.log(router.asPath);
      alert('request ok');
    } catch (e) {
      alert('request fail');
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('42gg-token', token);
      setFirstVisited(true);
      router.replace(`/`);
    }
    if (localStorage.getItem('42gg-token')) {
      setLoggedIn(true);
      getUserHandler();
    }
    setIsLoading(false);
  }, []);

  // return loggedIn ? (
  //   <>
  //     {firstVisited && <WelcomeModal />}
  //     {children}
  //   </>
  // ) : (
  //   <div className={styles.appContainer}>
  //     <div className={styles.background}>{!isLoading && <Login />}</div>
  //   </div>
  // );

  return user.isAdmin === true ? (
    <>
      {firstVisited && <WelcomeModal />}
      {children}
    </>
  ) : (
    <>
      <div className={styles.appContainer}>
        <div className={styles.background}>{!isLoading && <Load />}</div>
      </div>
    </>
  );
}
