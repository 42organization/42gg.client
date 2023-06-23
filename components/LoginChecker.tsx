import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from 'utils/recoil/login';
import { firstVisitedState } from 'utils/recoil/modal';
// import Load from 'pages/load';
import Login from 'pages/login';
import WelcomeModal from './modal/event/WelcomeModal';
import styles from 'styles/Layout/Layout.module.scss';

import useLoginCheck from 'hooks/Login/useLoginCheck';
interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoading, loggedIn, firstVisited] = useLoginCheck();

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
}
