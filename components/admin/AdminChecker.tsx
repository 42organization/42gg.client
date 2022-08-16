import { useRecoilValue } from 'recoil';
import { adminState } from 'utils/recoil/admin';
import Statistics from 'components/admin/statistics';
import styles from 'styles/Layout/Layout.module.scss';

interface AdminCheckerProps {
  children: React.ReactNode;
}

export default function AdminChecker({ children }: AdminCheckerProps) {
  const isAdmin = useRecoilValue(adminState);

  return isAdmin ? (
    <div className={styles.appContainer}>
      <div className={styles.background}>{<Statistics />}</div>
    </div>
  ) : (
    <>{children}</>
  );
}
