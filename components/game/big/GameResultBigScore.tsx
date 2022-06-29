import { useRouter } from 'next/router';
import { Team } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

type gameResultTypes = {
  status: string;
  time: string;
  team1: Team;
  team2: Team;
};

export default function GameResultBigScore({
  status,
  time,
  team1,
  team2,
}: gameResultTypes) {
  const router = useRouter();
  const isMain = router.asPath === '/' ? true : false;

  const getFindTimeSeconds = (gameTime: string) => {
    return (Number(new Date()) - Number(new Date(gameTime))) / 1000;
  };

  const getTimeAgo = (gameTime: string) => {
    const findTime = getFindTimeSeconds(gameTime);
    const times = [
      { time: '년', second: 60 * 60 * 24 * 365 },
      { time: '개월', second: 60 * 60 * 24 * 30 },
      { time: '일', second: 60 * 60 * 24 },
      { time: '시간', second: 60 * 60 },
      { time: '분', second: 60 },
    ];

    for (const item of times) {
      const betweenTime = Math.floor(findTime / item.second);

      if (betweenTime > 0) {
        return `${betweenTime}${item.time} 전`;
      }
    }
    return '방금 전';
  };

  return (
    <div className={styles.bigScoreBoard}>
      <div className={styles.gameStatus}>
        {isMain ? <>{status}</> : getTimeAgo(time)}
      </div>
      <div className={styles.gameScore}>
        {team1.score} : {team2.score}
      </div>
    </div>
  );
}
