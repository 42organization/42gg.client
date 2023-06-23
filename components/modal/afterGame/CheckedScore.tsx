import { TeamScore } from 'types/scoreTypes';
import styles from 'styles/modal/afterGame/AfterGameModal.module.scss';

interface CheckedScoreProps {
  result: TeamScore;
}

export default function CheckedScore({ result }: CheckedScoreProps) {
  return (
    <div className={styles.finalScore}>
      <div>{result.myTeamScore}</div>
      <div className={styles.middle}>:</div>
      <div>{result.enemyTeamScore}</div>
    </div>
  );
}
