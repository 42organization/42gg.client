import styles from '../../../styles/GameResultItem.module.scss';
import { Team } from '../../../types/gameTypes';

type gameResultTypes = {
  team: Team;
  userLeft: boolean;
};

export default function GameResultBigTeam({ team, userLeft }: gameResultTypes) {
  return (
    <div>
      <div className={styles.userInfo}>
        <div className={userLeft ? styles.bigLeft : styles.bigRight}>
          <div className={styles.userImage}>
            {team.players.map((player) => (
              <div key={player.userId}>{player.userId}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.userFont}>
        {team.players.map((player) => (
          <div key={player.userId}>
            <div>{player.userId}</div>
            <span>{player.wins}승 </span>
            <span>{player.losses}패 </span>
          </div>
        ))}
      </div>
    </div>
  );
}
