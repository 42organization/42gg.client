import { Slot } from 'types/matchTypes';
import MatchSlot from './MatchSlot';
import styles from 'styles/match/MatchSlotList.module.scss';

interface MatchSlotListProps {
  type: string;
  mode?: string;
  intervalMinute: number;
  matchSlots: Slot[];
  getMatchDataHandler: () => void;
}

export default function MatchSlotList({
  type,
  mode,
  intervalMinute,
  matchSlots,
  getMatchDataHandler,
}: MatchSlotListProps) {
  const slotHour = new Date(matchSlots[0].time).getHours();
  const slotHourIn12 = ChangeHourFrom24To12(slotHour);

  return (
    <>
      <div className={styles.slotHour}>{slotHourIn12}</div>
      <div className={styles.slotGrid}>
        {matchSlots.map((slot) => (
          <MatchSlot
            key={slot.slotId}
            type={type}
            matchMode={mode}
            slot={slot}
            intervalMinute={intervalMinute}
            getMatchDataHandler={getMatchDataHandler}
          ></MatchSlot>
        ))}
      </div>
    </>
  );
}

function ChangeHourFrom24To12(hour: number) {
  return `${hour < 12 ? '오전 ' : '오후 '} ${
    hour % 12 === 0 ? 12 : hour % 12
  }시`;
}
