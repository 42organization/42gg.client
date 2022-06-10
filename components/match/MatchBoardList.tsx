import { Slots } from '../../types/matchTypes';
import MatchBoard from './MatchBoard';

interface MatchBoardListProps {
  type: string;
  intervalMinute: number;
  matchBoards: Slots[];
}

export default function MatchBoardList({
  type,
  intervalMinute,
  matchBoards,
}: MatchBoardListProps) {
  const filteredMatchBoards = matchBoards.filter((matchSlots) => {
    const slotsHour = new Date(matchSlots[0].time).getHours();
    const nowHour = new Date().getHours();
    return nowHour <= slotsHour;
  });

  if (filteredMatchBoards.length === 0)
    return <div>오늘의 매치가 모두 끝났습니다!</div>;

  return (
    <div>
      {filteredMatchBoards.map((matchSlots, i) => (
        <MatchBoard
          key={i}
          type={type}
          intervalMinute={intervalMinute}
          matchSlots={matchSlots}
        />
      ))}
    </div>
  );
}
