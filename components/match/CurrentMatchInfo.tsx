import Link from 'next/link';
import { CurrentMatch } from '../../types/matchTypes';
import { dateToString } from '../../utils/handleTime';
import { useState, useEffect } from 'react';
import instance from '../../utils/axios';

export default function CurrentMatchInfo() {
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/match/current`);
        setCurrentMatch(res?.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!currentMatch) return null;

  const { isMatch, enemyTeam, time, slotId } = currentMatch;
  const matchingMessage = makeMessage(time, isMatch);
  const enemyTeamInfo = isBeforeMin(time, 5)
    ? makeEnemyTeamInfo(enemyTeam)
    : '';

  const onCancel = async () => {
    try {
      const res = await instance.delete(
        `/pingpong/match/tables/${1}/slots/${slotId}`
      );
      alert(res?.data.message);
      // 현재매치정보 삭제하기
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        {matchingMessage}
        {enemyTeamInfo}
      </div>
      <button onClick={onCancel}>취소하기</button>
    </div>
  );
}

function makeMessage(time: string, isMatch: boolean) {
  const formattedTime = dateToString(time);
  return (
    <div>
      🏓 <span>{formattedTime}</span>
      <span>
        {isMatch ? '에 경기가 시작됩니다!' : ' 참가자 기다리는 중...'}
      </span>
    </div>
  );
}

function isBeforeMin(gameTimeString: string, min: number) {
  const gameTime = new Date(gameTimeString);
  const afterMin = new Date();
  afterMin.setMinutes(afterMin.getMinutes() + min);
  return gameTime.getTime() <= afterMin.getTime();
}

function makeEnemyTeamInfo(enemyTeam: string[]) {
  const enemyUsers = enemyTeam.map((userId: string, i: number) => (
    <span key={userId}>
      <Link href={`/users/${userId}`}>{userId}</Link>
      {i < enemyTeam.length - 1 ? ', ' : ''}
    </span>
  ));
  return <div> 상대팀 : {enemyUsers}</div>;
}
