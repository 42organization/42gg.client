import styles from 'styles/takgu/Layout/Footer.module.scss';

export default function AgendaFooter() {
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
              'https://www.notion.so/bfbe7ad164d4450295e4978ce3121398?pvs=4'
            )
          }
        >
          Page Guide
        </div>
      </div>
      <div className={styles.copyright}>© 2024 42gg</div>
    </footer>
  );
}
