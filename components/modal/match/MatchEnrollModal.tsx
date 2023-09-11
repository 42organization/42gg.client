import { useState } from 'react';
import { Enroll } from 'types/modalTypes';
import { gameTimeToString } from 'utils/handleTime';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import useMatchEnrollModal from 'hooks/modal/match/useMatchEnrollModal';
import styles from 'styles/modal/match/MatchEnrollModal.module.scss';

export default function MatchEnrollModal({ startTime, endTime, mode }: Enroll) {
  const [isLoading, setIsLoading] = useState(false);
  const { onEnroll, onCancel } = useMatchEnrollModal({
    startTime,
    mode,
  });

  const handleEnroll = () => {
    setIsLoading(true);
    onEnroll().finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.phrase}>
        <div className={styles.emoji}>🏓</div>
        <div className={styles.time}>
          {gameTimeToString(startTime)} - {gameTimeToString(endTime)}
        </div>
        <div className={styles.message}>
          {mode === 'BOTH'
            ? '(빠른매칭)'
            : mode === 'RANK'
            ? '(랭크전)'
            : '(일반전)'}
          <br />
          경기에 참여하시겠습니까?
        </div>
      </div>
      <ModalButtonContainer>
        <ModalButton onClick={onCancel} style='negative' value='취소' />
        <ModalButton
          onClick={handleEnroll}
          style='positive'
          value='확인'
          isLoading={isLoading}
        />
      </ModalButtonContainer>
    </div>
  );
}
