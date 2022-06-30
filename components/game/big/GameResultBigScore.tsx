import { Team } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';
import { useEffect, useState } from 'react';

type gameResultTypes = {
  status: string;
  time: string;
  team1: Team;
  team2: Team;
};

type gameScoreView = {
  gameScoreMessage: string;
  statusStyles: string;
  statusMessage: JSX.Element;
};

export default function GameResultBigScore({
  status,
  time,
  team1,
  team2,
}: gameResultTypes) {
  const [scoreView, setScoreView] = useState<gameScoreView>({
    statusStyles: '',
    statusMessage: <></>,
    gameScoreMessage: team1.score + ' : ' + team2.score,
  });

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

  const setScoreViewHandler = (
    statusMessage: JSX.Element,
    statusStyles: string
  ) => {
    setScoreView((prev) => ({
      ...prev,
      statusMessage: statusMessage,
      statusStyles: statusStyles,
    }));
  };

  useEffect(() => {
    if (status === 'live') {
      setScoreViewHandler(<>Live</>, `${styles.gameStatusLive}`);
    } else if (status === 'wait') {
      setScoreViewHandler(
        <>
          <span className={styles.span1}>o</span>
          <span className={styles.span2}>o</span>
          <span className={styles.span3}>o</span>
        </>,
        `${styles.gameStatusWait}`
      );
    } else if (status === 'end') {
      setScoreViewHandler(<>{getTimeAgo(time)}</>, `${styles.gameStatusEnd}`);
    }
  }, []);

  return (
    <div className={styles.bigScoreBoard}>
      <div className={scoreView.statusStyles}>{scoreView.statusMessage}</div>
      <div className={styles.gameScore}>{scoreView.gameScoreMessage}</div>
    </div>
  );
}
