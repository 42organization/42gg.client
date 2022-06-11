import styles from '../../../styles/GameResultItem.module.css';
import { Game, Team } from '../../../types/gameTypes';

export default function GameResultBiglItem({
  game,
  team1,
  team2,
}: {
  game: Game;
  team1: Team;
  team2: Team;
}) {
  return (
    <div className={styles.div}>
      <div>
        스코어 {team1.score} : {team2.score}
        <div> {game.matchId + 'team1'}</div>
      </div>
    </div>
  );
}
