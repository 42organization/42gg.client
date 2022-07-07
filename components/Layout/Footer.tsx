import styles from 'styles/Layout/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.link}>
        <div onClick={() => window.open('https://github.com/42organization')}>
          Github
        </div>
        <div className={styles.bar}>|</div>
        <div
          onClick={() =>
            window.open(
              'https://github.com/42organization/42arcade.gg.client#주요-기능-소개'
            )
          }
        >
          Page Manual
        </div>
      </div>
      <div className={styles.copyright}>© 2022 42GG</div>
    </footer>
  );
}
