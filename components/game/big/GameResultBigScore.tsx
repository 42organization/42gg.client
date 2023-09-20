import { GameStatus, GameMode } from 'types/gameTypes';
import { SeasonMode } from 'types/mainType';
import { getTimeAgo } from 'utils/handleTime';
import gameScore from 'components/game/GameScore';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigScoreProps {
  mode: GameMode;
  status: GameStatus;
  time: string;
  page: string;
  scoreTeam1?: number;
  scoreTeam2?: number;
  radioMode?: SeasonMode;
}

export default function GameResultBigScore({
  mode,
  status,
  time,
  page,
  scoreTeam1,
  scoreTeam2,
  radioMode,
}: GameResultBigScoreProps) {
  const score = gameScore('BIG', mode, status, scoreTeam1, scoreTeam2);
  return (
    <div className={styles.bigScoreBoard}>
      <ScoreStatus
        status={status}
        time={time}
        page={page}
        radioMode={radioMode}
      />
      <div className={styles.gameScore}>{score}</div>
    </div>
  );
}

type scoreStatusProps = {
  status: GameStatus;
  time: string;
  page: string;
  radioMode?: SeasonMode;
};

function ScoreStatus({ status, time, page, radioMode }: scoreStatusProps) {
  switch (status) {
    case 'LIVE':
      return (
        <div className={`${styles.gameStatusLive} ${styles[page]}`}>Live</div>
      );
    case 'WAIT':
      return (
        <div className={`${styles.gameStatusWait} ${styles[page]}`}>
          <span className={styles.span1}>o</span>
          <span className={styles.span2}>o</span>
          <span className={styles.span3}>o</span>
        </div>
      );
    case 'END':
      return (
        <div
          className={`${styles['gameStatusEnd']} ${styles[page]} 
          ${radioMode ? styles[radioMode.toLowerCase()] : ''}`}
        >
          {getTimeAgo(time)}
        </div>
      );
    default:
      return null;
  }
}
