import MatchItem from "./MatchItem";
import { Slot, ManagedSlot } from "../../types/matchTypes";

interface MatchBoardProps {
  matchSlots: Slot[];
  type: string;
  interval: number;
}

export default function MatchBoard({
  matchSlots,
  interval,
  type,
}: MatchBoardProps) {
  return (
    <div>
      {matchSlots.map((slot, i) => {
        const startMin = i * interval;
        const endMin = (i + 1) * interval;
        const managedSlot: ManagedSlot = { ...slot, startMin, endMin };
        return (
          <MatchItem
            key={slot.slotId}
            type={type}
            slot={managedSlot}
          ></MatchItem>
        );
      })}
    </div>
  );
}
