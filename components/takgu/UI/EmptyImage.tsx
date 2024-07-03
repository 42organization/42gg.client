import NotiEmptyEmoji from 'public/image/takgu/noti_empty.svg';
import styles from 'styles/UI/EmptyImage.module.scss';

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
