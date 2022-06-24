import styles from '../../../styles/GameResultItem.module.scss';
import { Team } from '../../../types/gameTypes';

type gameResultTypes = {
  team: Team;
  userLeft: boolean;
};

export default function GameResultBigTeam({ team, userLeft }: gameResultTypes) {
  return (
    <div>
      <div className={styles.bigUserInfo}>
        <div className={userLeft ? styles.bigLeft : styles.bigRight}>
          <div className={styles.userImage}>
            {/* image url 추가 시 적용 */}
            {/* {team.players.map((player) => (
              <div key={player.userId}>{player.userId}</div>
            ))} */}
          </div>
        </div>
      </div>

      {team.players.map((player) => (
        <div key={player.userId}>
          <div className={styles.bigUserId}>{player.userId}</div>
          <div className={styles.bigUserWinRate}>
            <span>{player.wins}승 </span>
            <span>{player.losses}패 </span>
          </div>
        </div>
      ))}
    </div>
  );
}
