import Link from 'next/link';
import useAxiosWithToast from 'hooks/useAxiosWithToast';
import styles from 'styles/admin/Layout.module.scss';
import SideNav from './SideNav';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  useAxiosWithToast();

  return (
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
  );
}
