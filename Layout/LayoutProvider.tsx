import { useRecoilValue } from 'recoil';
import { loginState } from 'utils/recoil/login';
import AdminAppLayout from 'Layout/AdminLayout';
import AgendaAppLayout from 'Layout/AgendaLayout';
import TakguAppLayout from 'Layout/TakguLayout';
import { usePathname } from 'hooks/agenda/Layout/usePathname';

type LayoutProviderProps = {
  children: React.ReactNode;
};

// 현재 페이지가 어떤 레이아웃을 사용할지 결정
// 로그인 스테이트 등은 각 레이아웃에서 확인
const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const isLogin = useRecoilValue(loginState);
  console.log(isLogin);
  const app = usePathname();
  switch (app) {
    case '':
      return <>{children}</>;
    case 'agenda':
      return <AgendaAppLayout>{children}</AgendaAppLayout>;
    case 'takgu':
      return <TakguAppLayout>{children}</TakguAppLayout>;
    case 'admin':
      return <AdminAppLayout>{children}</AdminAppLayout>;
    default:
      return <>{children}</>;
  }
};

export default LayoutProvider;
