import styles from 'styles/takgu/UI/BouncingDots.module.scss';

export default function BouncingDots() {
  return (
    <div className={styles.bouncingDots}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}
