import { useRecoilValue } from 'recoil';
import { errorState } from 'utils/takgu/recoil/error';
import ErrorPage from 'components/takgu/error/Error';
import styles from 'styles/takgu/Layout/Layout.module.scss';

interface ErrorCheckerProps {
  children: React.ReactNode;
}

export default function ErrorChecker({ children }: ErrorCheckerProps) {
  const error = useRecoilValue(errorState);

  return error === '' ? (
    <>{children}</>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <ErrorPage />
      </div>
    </div>
  );
}
