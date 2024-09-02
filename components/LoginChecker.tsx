import Login from 'pages/login';
import useLoginCheck from 'hooks/Login/useLoginCheck';
import styles from 'styles/takgu/Layout/Layout.module.scss';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  return <>{children}</>;

  const [isLoading, loggedIn] = useLoginCheck();
  // return <>{children}</>;

  return loggedIn ? (
    <>{children}</>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
    </div>
  );
}
