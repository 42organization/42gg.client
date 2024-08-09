// import { useRouter } from 'next/router';
import AdminReject from 'components/admin/AdminReject';
import AdminLayout from 'components/admin/Layout';
import { useUser } from 'hooks/agenda/Layout/useUser';

type AdminLayoutProps = {
  children: React.ReactNode;
};

function AdminAppLayout({ children }: AdminLayoutProps) {
  const user = useUser();

  if (!user || !user.intraId) return null;

  if (!user.isAdmin) return <AdminReject />;

  return <AdminLayout>{children}</AdminLayout>;
}

export default AdminAppLayout;
