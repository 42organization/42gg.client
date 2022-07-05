import router from 'next/router';
import styles from 'styles/Layout/Footer.module.scss';

export default function Footer() {
  const ManualPathHandle = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <footer className={styles.footerContainer}>
      <div>
        <a href='https://github.com/42organization'>github |</a>
        <a onClick={() => ManualPathHandle('manual')}> manual</a>
      </div>
      <div>© 2022 42GG</div>
    </footer>
  );
}
