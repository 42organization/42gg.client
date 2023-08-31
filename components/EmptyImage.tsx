import NotiEmptyEmoji from 'public/image/noti_empty.svg';
import styles from 'styles/EmptyImage.module.scss';

function EmptyImage() {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.threeDots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <NotiEmptyEmoji />
    </div>
  );
}

export default EmptyImage;
