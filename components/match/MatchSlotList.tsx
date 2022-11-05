import { MatchMode } from 'types/mainType';
import { Slot } from 'types/matchTypes';
import MatchSlot from './MatchSlot';
import styles from 'styles/match/MatchSlotList.module.scss';

interface MatchSlotListProps {
  type: string;
  intervalMinute: number;
  toggleMode?: MatchMode;
  matchSlots: Slot[];
  getMatchHandler: () => void;
}

export default function MatchSlotList({
  type,
  intervalMinute,
  toggleMode,
  matchSlots,
  getMatchHandler,
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
            toggleMode={toggleMode}
            slot={slot}
            intervalMinute={intervalMinute}
            getMatchHandler={getMatchHandler}
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
