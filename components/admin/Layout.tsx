import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeProvider, createTheme } from '@mui/material';
import { instanceInAgenda, instanceInManage } from 'utils/axios';
import SideNav from 'components/admin/SideNav';
import useAxiosWithToast from 'hooks/useAxiosWithToast';
import styles from 'styles/admin/Layout.module.scss';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard', sans-serif", // $common-font
  },
});

export default function AdminLayout({ children }: AdminLayoutProps) {
  const presentPath = usePathname();
  let instance;
  switch (true) {
    case presentPath.includes('/admin/agenda'):
      instance = instanceInAgenda;
      break;
    default:
      instance = instanceInManage;
      break;
  }
  useAxiosWithToast(instance);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.adminContainer}>
        <div className={styles.header}>
          <Link href='/admin'>
            <div className={styles.title}>관리자 페이지</div>
          </Link>
          <Link href='/'>
            <button className={styles.homeButton}>Home</button>
          </Link>
        </div>
        <div className={styles.container}>
          <SideNav />
          <div className={styles.pageContent}>{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
