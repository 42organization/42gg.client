import { GameMode, GameStatus } from 'types/gameTypes';
import gameScore from 'components/takgu/game/GameScore';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultSmallScoreProps {
  mode: GameMode;
  status: GameStatus;
  scoreTeam1?: number;
  scoreTeam2?: number;
}

export default function GameResultSmallScore({
  mode,
  status,
  scoreTeam1,
  scoreTeam2,
}: GameResultSmallScoreProps) {
  const score = gameScore('SMALL', mode, status, scoreTeam1, scoreTeam2);
  return <div className={styles.smallScoreBoard}>{score}</div>;
}
