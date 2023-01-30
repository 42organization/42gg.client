import Link from 'next/link';
import SideNav from './SideNav';
import styles from 'styles/admin/Layout.module.scss';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <div className={styles.title}>관리자 페이지</div>
        <Link href='/'>
          <button className={styles.homeButton}>홈으로</button>
        </Link>
      </div>
      <div className={styles.container}>
        <SideNav />
        {children}
      </div>
    </div>
  );
}
