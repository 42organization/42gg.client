import Link from 'next/link';
import styles from 'styles/takgu/statistics/StatisticsHeader.module.scss';

export default function Header() {
  return (
    <div className={styles.headerWrap}>
      <div id={styles.logo}>
        <Link href={'/takgu'}>
          <div>42GG</div>
        </Link>
      </div>
    </div>
  );
}
