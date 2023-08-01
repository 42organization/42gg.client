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
{/*       {firstVisited && <WelcomeModal />}
 */}      {<WelcomeModal />}
      {children}
    </>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
    </div>
  );
}
