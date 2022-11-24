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
  return (
    <>
      <div className={styles.slotHour}></div>
      <div className={styles.slotGrid}>
        {matchSlots.map((slot) => (
          <MatchSlot
            key={slot.slotId}
            type={type}
            checkBoxMode={checkBoxMode}
            slot={slot}
          ></MatchSlot>
        ))}
      </div>
    </>
  );
}
