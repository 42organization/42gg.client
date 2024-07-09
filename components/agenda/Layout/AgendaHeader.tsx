import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import styles from 'styles/agenda/Layout/Header.module.scss';

export default function AgendaHeader() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrap}>
        <div className={styles.headerLeft}>
          <FiMenu className={styles.menuIcon} />
          <Link className={styles.logoWrap} href={'/agenda'}>
            42AGENDA
          </Link>
        </div>
      </div>
    </div>
  );
}
