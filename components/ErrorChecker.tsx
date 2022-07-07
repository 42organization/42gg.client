import { errorState } from 'utils/recoil/error';
import { useRecoilValue } from 'recoil';
import ErrorPage from './ErrorPage';
import styles from 'styles/Layout/Layout.module.scss';

interface ErrorCheckerProps {
  children: React.ReactNode;
}

export default function ErrorChecker({ children }: ErrorCheckerProps) {
  const errorMessage = useRecoilValue(errorState);

  return errorMessage === '' ? (
    <>{children}</>
  ) : (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <ErrorPage />
      </div>
    </div>
  );
}
