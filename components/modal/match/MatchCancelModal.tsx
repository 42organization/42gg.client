import { useState } from 'react';
import { Cancel } from 'types/modalTypes';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import useMatchCancelModal from 'hooks/modal/match/useMatchCancelModal';
import styles from 'styles/modal/match/MatchCancelModal.module.scss';

export default function MatchCancelModal({ startTime }: Cancel) {
  const [isLoading, setIsLoading] = useState(false);
  const { content, contentType, rejectCancel, onCancel, onReturn, myMatch } =
    useMatchCancelModal({ startTime });

  const handleCancel = () => {
    setIsLoading(true);
    onCancel().finally(() => {
      setIsLoading(false);
    });
  };

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
      <ModalButtonContainer>
        {rejectCancel ? (
          <ModalButton onClick={onReturn} style='positive' value='확인' />
        ) : (
          <>
            <ModalButton onClick={onReturn} style='negative' value='아니오' />
            <ModalButton
              onClick={handleCancel}
              style='positive'
              value='예'
              isLoading={isLoading}
            />
          </>
        )}
      </ModalButtonContainer>
    </div>
  );
}
