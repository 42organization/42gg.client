import { Room } from "../types/matchTypes";

interface MatchItemProps {
  room: Room;
}

export default function MatchItem({ room }: MatchItemProps) {
  const { start, end, headCnt, headMax } = room;
  return (
    <div>
      <span>
        {start} - {end}
      </span>
      <span> {headCnt === 0 ? "+" : `${headCnt}/${headMax}`} </span>
    </div>
  );
}
