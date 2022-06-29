import { useEffect, useState } from 'react';
import { MatchData } from 'types/matchTypes';
import instance from 'utils/axios';
import MatchBoard from './MatchBoard';
import styles from 'styles/match/MatchBoardList.module.scss';

interface MatchBoardListProps {
  type: string;
}

export default function MatchBoardList({ type }: MatchBoardListProps) {
  const [matchData, setMatchData] = useState<MatchData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/match/tables/${1}/single`);
        setMatchData(res?.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!matchData) return null;

  const { matchBoards, intervalMinute } = matchData;

  const filteredMatchBoards = matchBoards.filter((matchSlots) => {
    const lastIndex = matchSlots.length - 1;
    const slotsTime = new Date(matchSlots[lastIndex].time);
    const nowTime = new Date();
    return nowTime.getTime() <= slotsTime.getTime();
  });

  if (filteredMatchBoards.length === 0)
    return <div>오늘의 매치가 모두 끝났습니다!</div>;

  return (
    <div className={styles.matchBoardList}>
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
