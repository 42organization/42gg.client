import { Team } from '../../../types/gameTypes';
import styles from '../../../styles/GameResultItem.module.scss';

type gameResultTypes = {
  status: string;
  team1: Team;
  team2: Team;
};

export default function GameResultBigScore({
  status,
  team1,
  team2,
}: gameResultTypes) {
  return (
    <div className={styles.scoreBoard}>
      <div>{status}</div>
      <div>
        {team1.score} : {team2.score}
      </div>
    </div>
  );
}
