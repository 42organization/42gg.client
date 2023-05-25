import { getTimeAgo } from 'utils/handleTime';
import { GameStatus, GameMode } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigScoreProps {
  mode: GameMode;
  status: GameStatus;
  time: string;
  scoreTeam1?: number;
  scoreTeam2?: number;
}

export default function GameResultBigScore({
  mode,
  status,
  time,
  scoreTeam1,
  scoreTeam2,
}: GameResultBigScoreProps) {
  return (
    <div className={styles.bigScoreBoard}>
      {makeScoreStatus(status, time)}
      <div className={styles.gameScore}>
        {mode === 'NORMAL' ? 'VS' : `${scoreTeam1} : ${scoreTeam2}`}
      </div>
    </div>
  );
}

function makeScoreStatus(status: GameStatus, time: string) {
  switch (status) {
    case 'LIVE':
      return <div className={styles.gameStatusLive}>Live</div>;
    case 'WAIT':
      return (
        <div className={styles.gameStatusWait}>
          <span className={styles.span1}>o</span>
          <span className={styles.span2}>o</span>
          <span className={styles.span3}>o</span>
        </div>
      );
    case 'END':
      return <div className={styles.gameStatusEnd}>{getTimeAgo(time)}</div>;
    default:
      return null;
  }
}
