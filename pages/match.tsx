import { useEffect, useState } from 'react';
import MatchBoardList from '../components/match/MatchBoardList';
import { MatchData } from '../types/matchTypes';
import { getData } from '../utils/axios';
import MatchEnrollModal from '../components/match/MatchEnrollModal';

export default function Match() {
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData(`/pingpong/match/tables/${1}?type=single`);
        setMatchData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!matchData) return <div>loading...</div>;

  return (
    <div>
      <MatchBoardList
        type="single"
        startTime={matchData.startTime}
        intervalMinute={matchData.intervalMinute}
        matchBoards={matchData.matchBoards}
      />
      <MatchEnrollModal />
    </div>
  );
}
