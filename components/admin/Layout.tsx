import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material';
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
  useAxiosWithToast();

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
