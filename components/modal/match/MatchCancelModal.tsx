import { Cancel } from 'types/modalTypes';
import styles from 'styles/modal/match/MatchCancelModal.module.scss';
import useMatchCancelModal from 'hooks/modal/match/useMatchCancelModal';

export default function MatchCancelModal({ startTime }: Cancel) {
  const { content, contentType, rejectCancel, onCancel, onReturn, myMatch } =
    useMatchCancelModal({ startTime });

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>{content[contentType].emoji}</div>
        <div className={styles.message}>{content[contentType].main}</div>
        {rejectCancel || (!rejectCancel && myMatch?.isMatched) ? (
          <div className={styles.subContent}>{content[contentType].sub}</div>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.buttons}>
        {rejectCancel ? (
          <div className={styles.positive}>
            <input onClick={onReturn} type='button' value='확인' />
          </div>
        ) : (
          <>
            <div className={styles.negative}>
              <input onClick={onReturn} type='button' value='아니오' />
            </div>
            <div className={styles.positive}>
              <input onClick={onCancel} type='button' value='예' />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
