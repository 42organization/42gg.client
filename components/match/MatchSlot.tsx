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
}

function MatchSlot({ type, slot, toggleMode }: MatchSlotProps) {
  const setModal = useSetRecoilState(modalState);
  const [currentMatch] = useRecoilState(currentMatchState);
  const { event } = useRecoilValue(liveState);
  const { headCount, slotId, status, time, endTime, mode } = slot;
  const headMax = type === 'single' ? 2 : 4;
  const slotStartTime = new Date(time);
  const slotEndTime = new Date(endTime);
  const slotData = `${minuiteToStr(
    slotStartTime.getMinutes()
  )} - ${minuiteToStr(slotEndTime.getMinutes())}`;

  const isAfterSlot: boolean =
    slotStartTime.getTime() - new Date().getTime() >= 0;
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
          slotStartTime,
          slotEndTime,
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
        {slotData === '00 - 00'
          ? `${slotStartTime.getHours() % 12}:00 - ${
              slotEndTime.getHours() % 12
            }:00`
          : slotData}
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
