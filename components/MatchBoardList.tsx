import { MatchData } from "../types/matchTypes";
import MatchBoard from "./MatchBoard";

interface MatchBoardListProps {
  matchData: MatchData | null;
}

export default function MatchBoardList({ matchData }: MatchBoardListProps) {
  if (matchData) {
    const { startTime, intervalMinute, type, matchBoards } = matchData;
    const startHour = parseInt(startTime.split(":")[0]);
    const interval = intervalMinute;
    return (
      <div>
        {matchBoards.map((matchSlots, i) => (
          <div key={i}>
            {startHour + i}
            <MatchBoard
              type={type}
              interval={interval}
              matchSlots={matchSlots}
            />
          </div>
        ))}
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}
