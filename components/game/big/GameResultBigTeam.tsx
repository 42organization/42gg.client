import { Team } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';
import Link from 'next/link';

type gameResultTypes = {
  team: Team;
  userLeft: boolean;
};

export default function GameResultBigTeam({ team, userLeft }: gameResultTypes) {
  return (
    <div className={styles.bigTeam}>
      <div className={styles.userImage}>
        {/* image url 추가 시 적용 */}
        {/* {team.players.map((player) => (
              <div key={player.userId}>{player.userId}</div>
            ))} */}
      </div>
      {team.players.map((player) => (
        <div key={player.userId}>
          <Link href={`/users/${player.userId}`}>
            <div className={`${styles.userId} ${styles.cursorOn}`}>
              {player.userId}
            </div>
          </Link>
          <div className={styles.winRate}>
            <span>{player.wins}승 </span>
            <span>{player.losses}패 </span>
          </div>
        </div>
      ))}
    </div>
  );
}
