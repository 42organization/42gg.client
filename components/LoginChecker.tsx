import Login from 'pages/login';
import useLoginCheck from 'hooks/Login/useLoginCheck';
import styles from 'styles/takgu/Layout/Layout.module.scss';

interface LoginCheckerProps {
  children: React.ReactNode;
}

export default function LoginChecker({ children }: LoginCheckerProps) {
  const [isLoading, loggedIn] = useLoginCheck();
  // dev 환경에서는 로그인 상태를 유지
  // 만약 로그인 상태를 확인하고 싶다면, 아래 주석처리 필요
  if (process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  return loggedIn ? (
    <>{children}</>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>{!isLoading && <Login />}</div>
    </div>
  );
}
