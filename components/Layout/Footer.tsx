import Link from 'next/link';
import styles from 'styles/Layout/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div>
        <a href='https://github.com/42organization'>github |</a>
        <Link href={`/manual`}> manual</Link>
      </div>
      <div>© 2022 42GG</div>
    </footer>
  );
}
