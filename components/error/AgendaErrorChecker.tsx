import { useRecoilValue } from 'recoil';
import { errorState } from 'utils/recoil/error';
import ErrorPage from 'components/error/AgendaError';

interface ErrorCheckerProps {
  children: React.ReactNode;
}

// 에러 체커 컴포넌트
// 추후 takgu쪽과 디자인을 어느정도 맞춘 후 통합할 예정
export default function ErrorChecker({ children }: ErrorCheckerProps) {
  const error = useRecoilValue(errorState);

  return error === '' ? <>{children}</> : <ErrorPage />;
}
