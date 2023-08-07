import Login from 'pages/login';
import styles from 'styles/Layout/Layout.module.scss';

import useLoginCheck from 'hooks/Login/useLoginCheck';
interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoading, loggedIn] = useLoginCheck();

  return loggedIn ? (
    <>{children}</>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
    </div>
  );
}
