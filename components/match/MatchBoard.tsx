import { Slot } from 'types/matchTypes';
import MatchItem from './MatchItem';
import styles from 'styles/match/MatchBoard.module.scss';

interface MatchBoardProps {
  matchSlots: Slot[];
  type: string;
  intervalMinute: number;
}

export default function MatchBoard({
  matchSlots,
  intervalMinute,
  type,
}: MatchBoardProps) {
  const slotsHour = new Date(matchSlots[0].time).getHours();
  const slotHourString = changeTo12HourClock(slotsHour);

  return (
    <>
      <div className={styles.matchBoard}>
        <div className={styles.slotHourString}>{slotHourString}</div>
        <div className={styles.gridContainer}>
          {matchSlots.map((slot) => (
            <MatchItem
              key={slot.slotId}
              type={type}
              slot={slot}
              intervalMinute={intervalMinute}
            ></MatchItem>
          ))}
        </div>
      </div>
    </>
  );
}

function changeTo12HourClock(hour: number) {
  return `${hour < 12 ? '오전 ' : '오후 '} ${hour % 12}시`;
}
