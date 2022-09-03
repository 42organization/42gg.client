import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultSmallScoreProps {
  mode: string;
  scoreTeam1?: number;
  scoreTeam2?: number;
}

export default function GameResultSmallScore({
  mode,
  scoreTeam1,
  scoreTeam2,
}: GameResultSmallScoreProps) {
  return (
    <div className={styles.smallScoreBoard}>
      {mode === 'normal' ? '일반전' : `${scoreTeam1} : ${scoreTeam2}`}
    </div>
  );
}
