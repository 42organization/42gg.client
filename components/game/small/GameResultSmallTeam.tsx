import { Team } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

type gameResultTypes = {
  team: Team;
  userLeft: boolean;
};

export default function GameResultSmallTeam({
  team,
  userLeft,
}: gameResultTypes) {
  return (
    <div className={styles.smallTeam}>
      <div className={userLeft ? styles.smallLeft : styles.smallRight}>
        <span className={styles.userImage}></span>
        <span>
          {team.players.map((player) => (
            <div key={player.intraId} className={styles.cursorOn}>
              {player.intraId}
            </div>
          ))}
        </span>
      </div>
    </div>
  );
}
