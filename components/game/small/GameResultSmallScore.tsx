import styles from 'styles/game/GameResultItem.module.scss';

type gameResultTypes = {
  scoreTeam1: number;
  scoreTeam2: number;
};

export default function GameResultSmallScore({
  scoreTeam1,
  scoreTeam2,
}: gameResultTypes) {
  return (
    <div>
      <div className={styles.smallScoreBoard}>
        {scoreTeam1} : {scoreTeam2}
      </div>
    </div>
  );
}
