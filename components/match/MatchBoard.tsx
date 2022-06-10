import { Slot } from '../../types/matchTypes';
import MatchItem from './MatchItem';

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

  return (
    <div>
      <div>{slotsHour}</div>
      <div>
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
  );
}
