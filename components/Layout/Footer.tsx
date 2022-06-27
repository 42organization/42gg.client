import styles from 'styles/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div>
        <a href='https://github.com/42organization'>github |</a>
        <a href=''> manual</a>
      </div>
      <div>© 2022 42GG</div>
    </footer>
  );
}
