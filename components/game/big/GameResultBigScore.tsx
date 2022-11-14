import { getTimeAgo } from 'utils/handleTime';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigScoreProps {
  mode: string;
  status: string;
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
        {mode === 'normal' ? 'VS' : `${scoreTeam1} : ${scoreTeam2}`}
      </div>
    </div>
  );
}

function makeScoreStatus(status: string, time: string) {
  switch (status) {
    case 'live':
      return <div className={styles.gameStatusLive}>Live</div>;
    case 'wait':
      return (
        <div className={styles.gameStatusWait}>
          <span className={styles.span1}>o</span>
          <span className={styles.span2}>o</span>
          <span className={styles.span3}>o</span>
        </div>
      );
    case 'end':
      return <div className={styles.gameStatusEnd}>{getTimeAgo(time)}</div>;
    default:
      return null;
  }
}
