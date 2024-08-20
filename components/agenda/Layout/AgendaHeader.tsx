import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import Logo from 'public/image/main-logo.svg';
import styles from 'styles/agenda/Layout/Header.module.scss';
export default function AgendaHeader() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft}>
          <Logo className={styles.logo} />
          {/* <img src='/image/main-logo.svg' className={styles.logo} /> */}
        </div>
        <FiMenu className={styles.menuIcon} />
      </div>
    </div>
  );
}
