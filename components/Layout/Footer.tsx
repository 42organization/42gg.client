import styles from 'styles/Layout/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.link}>
        <div
          onClick={() =>
            window.open('https://github.com/42organization/42gg_softwave')
          }
        >
          Github
        </div>
        <div className={styles.bar}>|</div>
        <div
          onClick={() =>
            window.open(
              'https://github.com/42organization/42arcade.gg.client/wiki/42gg.kr--%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%80%EC%9D%B4%EB%93%9C'
            )
          }
        >
          Page Guide
        </div>
      </div>
      <div className={styles.copyright}>© 2022 42gg</div>
    </footer>
  );
}
