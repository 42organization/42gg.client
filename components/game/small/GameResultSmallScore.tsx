import { Team } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

type gameResultTypes = {
  team1: Team;
  team2: Team;
};

export default function GameResultSmallScore({
  team1,
  team2,
}: gameResultTypes) {
  return (
    <div>
      <div className={styles.smallScoreBoard}>
        {team1.score} : {team2.score}
      </div>
    </div>
  );
}
