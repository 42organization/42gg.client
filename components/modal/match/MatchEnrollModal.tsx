import { NewEnroll } from 'types/modalTypes';
import styles from 'styles/modal/match/MatchEnrollModal.module.scss';
import useMatchEnrollModal from 'hooks/modal/match/useMatchEnrollModal';

export default function MatchEnrollModal({
  startTime,
  endTime,
  mode,
}: NewEnroll) {
  const { onEnroll, onCancel } = useMatchEnrollModal({
    startTime,
    mode,
  });

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🏓</div>
        <div className={styles.time}>
          {startTime.slice(-8, -3)} - {endTime.slice(-8, -3)}
        </div>
        <div>
          {mode === 'RANK' ? '(랭크전)' : '(일반전)'}
          <br />
          경기에 참여하시겠습니까?
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.negative}>
          <input onClick={onCancel} type='button' value='취소' />
        </div>
        <div className={styles.positive}>
          <input onClick={onEnroll} type='button' value='확인' />
        </div>
      </div>
    </div>
  );
}
