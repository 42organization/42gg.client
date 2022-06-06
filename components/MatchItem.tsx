import { ManagedSlot } from "../types/matchTypes";

interface MatchItemProps {
  slot: ManagedSlot;
  type: string;
}

export default function MatchItem({ type, slot }: MatchItemProps) {
  const { startMin, endMin, headCount } = slot;
  const startMinString = minuiteToStr(startMin);
  const endMinString = minuiteToStr(endMin);
  const headMax = type === "single" ? 2 : 4;

  return (
    <button onClick={() => alert(`${startMin} - ${endMin}`)}>
      <span>
        {startMinString} - {endMinString}
      </span>
      <span> {headCount === 0 ? "+" : `${headCount}/${headMax}`} </span>
    </button>
  );
}

function minuiteToStr(min: number) {
  min = min === 60 ? 0 : min;
  return min < 10 ? "0" + min.toString() : min.toString();
}
