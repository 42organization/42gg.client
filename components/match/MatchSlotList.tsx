import { useRef } from 'react';
import { MatchMode } from 'types/mainType';
import { Slot } from 'types/matchTypes';
import MatchSlot from './MatchSlot';
import styles from 'styles/match/MatchSlotList.module.scss';

interface MatchSlotListProps {
  type: string;
  checkBoxMode?: MatchMode;
  matchSlots: Slot[];
}

export default function MatchSlotList({
  type,
  checkBoxMode,
  matchSlots,
}: MatchSlotListProps) {
  const isFirstOpenedSlotId = useRef<number>(0);
  const myTableId = useRef<number>(0);

  return (
    <>
      <div className={styles.slotHour}></div>
      <div className={styles.slotGrid}>
        {matchSlots.map((slot) => {
          if (slot.status === 'open' && isFirstOpenedSlotId.current === 0) {
            isFirstOpenedSlotId.current = slot.slotId;
          }

          if (slot.status === 'mytable' && myTableId.current === 0) {
            myTableId.current = slot.slotId;
          }

          return (
            <MatchSlot
              key={slot.slotId}
              type={type}
              checkBoxMode={checkBoxMode}
              slot={slot}
              scrollTargetId={
                myTableId.current !== 0
                  ? myTableId.current
                  : isFirstOpenedSlotId.current
              }
            />
          );
        })}
      </div>
    </>
  );
}
