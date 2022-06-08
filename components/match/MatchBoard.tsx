import { Slot, ManagedSlot } from '../../types/matchTypes';
import MatchItem from './MatchItem';

interface MatchBoardProps {
  matchSlots: Slot[];
  type: string;
  hour: number;
  intervalMinute: number;
}

export default function MatchBoard({
  matchSlots,
  intervalMinute,
  type,
  hour: startHour,
}: MatchBoardProps) {
  const makeManagedSlot = (slot: Slot, i: number): ManagedSlot => {
    const startMin = i * intervalMinute;
    const endMin = (i + 1) * intervalMinute;
    const endHour = endMin === 60 ? (startHour + 1) % 24 : startHour;
    return {
      ...slot,
      startTime: `${startHour}:${minuiteToStr(startMin)}`,
      endTime: `${endHour}:${minuiteToStr(endMin)}`,
    };
  };

  return (
    <div>
      <div>{startHour}</div>
      <div>
        {matchSlots.map((slot, i) => (
          <MatchItem
            key={slot.slotId}
            type={type}
            slot={makeManagedSlot(slot, i)}
          ></MatchItem>
        ))}
      </div>
    </div>
  );
}

function minuiteToStr(min: number) {
  min = min === 60 ? 0 : min;
  return min < 10 ? '0' + min.toString() : min.toString();
}
