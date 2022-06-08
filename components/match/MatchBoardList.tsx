import { Slots } from '../../types/matchTypes';
import MatchBoard from './MatchBoard';

interface MatchBoardListProps {
  type: string;
  startTime: string;
  intervalMinute: number;
  matchBoards: Slots[];
}

export default function MatchBoardList({
  type,
  startTime,
  intervalMinute,
  matchBoards,
}: MatchBoardListProps) {
  const startHour = parseInt(startTime.split(':')[0]);
  return (
    <div>
      {matchBoards.map((matchSlots, i) => (
        <MatchBoard
          key={i}
          type={type}
          intervalMinute={intervalMinute}
          hour={startHour + i}
          matchSlots={matchSlots}
        />
      ))}
    </div>
  );
}
