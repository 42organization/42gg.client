import styles from 'styles/GameResultItem.module.scss';
import { Team } from 'types/gameTypes';

type gameResultTypes = {
  team: Team;
  userLeft: boolean;
};

export default function GameResultBigTeam({ team, userLeft }: gameResultTypes) {
  return (
    <div className={styles.smallUserInfo}>
      <div className={userLeft ? styles.smallLeft : styles.smallRight}>
        <span className={styles.userImage}></span>
        <span className={styles.user}>
          {team.players.map((player) => (
            <div key={player.userId}>{player.userId}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
