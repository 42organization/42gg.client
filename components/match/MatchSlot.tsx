import React, { useMemo } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { MatchMode } from 'types/mainType';
import { Slot } from 'types/matchTypes';
import { liveState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import { fillZero } from 'utils/handleTime';
import { currentMatchState } from 'utils/recoil/match';
import styles from 'styles/match/MatchSlot.module.scss';

interface MatchSlotProps {
  type: string;
  slot: Slot;
  toggleMode?: MatchMode;
  intervalMinute: number;
}

function MatchSlot({ type, slot, toggleMode, intervalMinute }: MatchSlotProps) {
  const setModal = useSetRecoilState(modalState);
  const [currentMatch] = useRecoilState(currentMatchState);
  const { event } = useRecoilValue(liveState);
  const { headCount, slotId, status, time, mode } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const startTime = new Date(time);
  const endTime = new Date(time);
  endTime.setMinutes(endTime.getMinutes() + intervalMinute);
  const isAfterSlot: boolean = startTime.getTime() - new Date().getTime() >= 0;
  const buttonStyle: { [key: string]: string } = useMemo(
    () => ({
      mytable: toggleMode === mode ? styles.my : styles.disabled,
      close: styles.disabled,
      open: toggleMode === 'rank' ? styles.rank : styles.normal,
    }),
    [slot]
  );

  const enrollHandler = async () => {
    if (status === 'mytable') {
      setModal({
        modalName: 'MATCH-CANCEL',
        cancel: {
          isMatched: currentMatch.isMatched,
          slotId: currentMatch.slotId,
          time: currentMatch.time,
        },
      });
    } else if (event === 'match') {
      setModal({ modalName: 'MATCH-REJECT' });
    } else {
      setModal({
        modalName: 'MATCH-ENROLL',
        enroll: {
          slotId,
          type,
          mode: toggleMode,
          startTime,
          endTime,
        },
      });
    }
  };

  return (
    <button
      className={`${styles.slotButton} ${buttonStyle[status]}`}
      disabled={status === 'close'}
      onClick={enrollHandler}
    >
      <span className={styles.time}>
        {minuiteToStr(startTime.getMinutes())} -{' '}
        {minuiteToStr(endTime.getMinutes())}
        {status === 'mytable' && ' 🙋'}
      </span>
      <span className={`${styles.headCount} ${headCount === 0 && styles.plus}`}>
        {isAfterSlot && (headCount === 0 ? '+' : `${headCount}/${headMax}`)}
      </span>
    </button>
  );
}

function minuiteToStr(min: number) {
  return fillZero(min.toString(), 2);
}

export default React.memo(MatchSlot);
