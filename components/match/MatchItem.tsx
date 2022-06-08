import { ManagedSlot, EnrollInfo } from "../../types/matchTypes";
import { enrollInfoState } from "../../utils/recoil/match";
import { useSetRecoilState } from "recoil";

interface MatchItemProps {
  slot: ManagedSlot;
  type: string;
}

export default function MatchItem({ type, slot }: MatchItemProps) {
  const setEnrollInfo = useSetRecoilState<EnrollInfo | null>(enrollInfoState);
  const { startTime, endTime, headCount, slotId, status } = slot;
  const startMinString = startTime.split(":")[1];
  const endMinString = endTime.split(":")[1];
  const headMax = type === "single" ? 2 : 4;

  const onClick = () => {
    setEnrollInfo({
      slotId,
      type,
      startTime,
      endTime,
    });
  };

  return (
    <button disabled={status === "close"} onClick={onClick}>
      <span>
        {startMinString} - {endMinString}
      </span>
      <span> {headCount === 0 ? "+" : `${headCount}/${headMax}`} </span>
    </button>
  );
}
