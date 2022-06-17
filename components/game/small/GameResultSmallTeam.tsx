import styles from '../../../styles/GameResultItem.module.scss';
import { Team } from '../../../types/gameTypes';

type gameResultTypes = {
  team: Team;
  userLeft: boolean;
};

export default function GameResultBigTeam({ team, userLeft }: gameResultTypes) {
  return (
    <div className={styles.userInfo}>
      <div className={userLeft ? styles.smallLeft : styles.smallRight}>
        <div className={styles.userImage}>
          {team.players.map((player) => (
            <div key={player.userId}>{player.userId}</div>
          ))}
        </div>

        <span>
          {team.players.map((player) => (
            <div key={player.userId}>{player.userId}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
