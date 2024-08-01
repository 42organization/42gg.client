import { useRecoilValue } from 'recoil';
import { errorState } from 'utils/recoil/error';
import AgendaErrorPage from 'components/error/AgendaError';
import TakguErrorPage from 'components/error/Error';
import { usePathname } from 'hooks/agenda/Layout/usePathname';
import styles from 'styles/takgu/Layout/Layout.module.scss';
interface ErrorCheckerProps {
  children: React.ReactNode;
}

// 에러 체커 컴포넌트
// 추후 takgu쪽과 디자인을 어느정도 맞춘 후 통합할 예정
export default function ErrorChecker({ children }: ErrorCheckerProps) {
  const error = useRecoilValue(errorState);
  const app = usePathname();

  return error === '' ? (
    <>{children}</>
  ) : app === 'takgu' ? (
    <div className={styles.appContainer}>
      <div className={styles.background}>
        <TakguErrorPage />
      </div>
    </div>
  ) : (
    <AgendaErrorPage />
  );
}
