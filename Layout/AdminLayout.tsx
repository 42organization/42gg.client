import { usePathname } from 'next/navigation';
import AdminReject from 'components/admin/AdminReject';
import AdminLayout from 'components/admin/Layout';
import AgendaModalProvider from 'components/agenda/modal/AgendaModalProvider';
import ModalProvider from 'components/takgu/modal/ModalProvider';
import { useUser } from 'hooks/agenda/Layout/useUser';

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminAppLayout({ children }: AdminLayoutProps) {
  const user = useUser();
  const presentPath = usePathname();

  // 사용자 정보가 없거나 관리자가 아닐 경우
  if (!user || !user.intraId) return null;

  if (!user.isAdmin) return <AdminReject />;

  // 모달 제공자 결정
  let ModalProviderComponent;
  if (presentPath.includes('admin/takgu')) {
    ModalProviderComponent = ModalProvider;
  } else if (presentPath.includes('admin/agenda')) {
    ModalProviderComponent = AgendaModalProvider;
  }

  return (
    <AdminLayout>
      {children}
      {ModalProviderComponent ? <ModalProviderComponent /> : ''}
    </AdminLayout>
  );
}

export default AdminAppLayout;
