import { Slot, ManagedSlot } from "../../types/matchTypes";
import MatchItem from "./MatchItem";

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
  hour,
}: MatchBoardProps) {
  return (
    <div>
      <div>{hour}</div>
      <div>
        {matchSlots.map((slot, i) => {
          const startMin = i * intervalMinute;
          const endMin = (i + 1) * intervalMinute;
          const startHour = hour;
          const endHour = endMin === 60 ? (startHour + 1) % 24 : startHour;
          const managedSlot: ManagedSlot = {
            ...slot,
            startTime: `${startHour}:${minuiteToStr(startMin)}`,
            endTime: `${endHour}:${minuiteToStr(endMin)}`,
          };
          return (
            <MatchItem
              key={slot.slotId}
              type={type}
              slot={managedSlot}
            ></MatchItem>
          );
        })}
      </div>
    </div>
  );
}

function minuiteToStr(min: number) {
  min = min === 60 ? 0 : min;
  return min < 10 ? "0" + min.toString() : min.toString();
}
