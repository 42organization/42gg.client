import { useRecoilValue } from 'recoil';
import { errorState } from 'utils/recoil/error';
import ErrorPage from 'components/error/Error';
import styles from 'styles/Layout/Layout.module.scss';

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
