import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';
// import Load from 'pages/load';
import Login from 'pages/login';
import styles from 'styles/Layout/Layout.module.scss';
import WelcomeModal from './modal/event/WelcomeModal';
import modalStyles from 'styles/modal/Modal.module.scss';

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

  const closeModalHandler = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      setFirstVisited(false);
    }
    setFirstVisited(false);
  };

  const welcomeModal = () => {
    return (
      <div
        className={modalStyles.backdrop}
        id='modalOutside'
        onClick={closeModalHandler}
      >
        <div className={modalStyles.modalContainer}>
          <WelcomeModal />
        </div>
      </div>
    );
  };

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
      {firstVisited && welcomeModal()}
      {children}
    </>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
      {/* <div className={styles.background}>{!isLoading && <Load />}</div> */}
    </div>
  );
}
