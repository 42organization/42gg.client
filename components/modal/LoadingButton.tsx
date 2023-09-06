import styles from 'styles/modal/LoadingButton.module.scss';

export default function LoadingButton() {
  return (
    <div className={styles.loadingButton}>
      <div className={styles.loading}>
        <span className={styles.span1}>o</span>
        <span className={styles.span2}>o</span>
        <span className={styles.span3}>o</span>
      </div>
    </div>
  );
}
