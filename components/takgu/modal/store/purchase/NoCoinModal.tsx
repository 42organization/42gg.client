import useNoCoinModal from 'hooks/modal/store/purchase/useNoCoinModal';
import styles from 'styles/modal/store/NoCoinModal.module.scss';

export default function NoCoinModal() {
  const { onPlay, onCancel } = useNoCoinModal();

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>😥</div>
        <div className={styles.message}>GG코인이 부족합니다</div>
        <div className={styles.details}>
          💸게임에 참여하여 코인을 획득해보세요💸
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onCancel} type='button' value='취소' />
        </div>
        <div className={styles.positive}>
          <input onClick={onPlay} type='button' value='게임 참여' />
        </div>
      </div>
    </div>
  );
}
