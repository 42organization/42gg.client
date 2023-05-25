import { Enroll } from 'types/modalTypes';
import { gameTimeToString } from 'utils/handleTime';
import styles from 'styles/modal/match/MatchEnrollModal.module.scss';
import useMatchEnrollModal from 'hooks/modal/match/useMatchEnrollModal';

export default function MatchEnrollModal({ startTime, endTime, mode }: Enroll) {
  const { onEnroll, onCancel } = useMatchEnrollModal({
    startTime,
    mode,
  });

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🏓</div>
        <div className={styles.time}>
          {startTime.slice(-5)} - {endTime.slice(-5)}
        </div>
        <div>
          {mode === 'rank' ? '(랭크전)' : '(일반전)'}
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
