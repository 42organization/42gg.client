import Link from 'next/link';
import styles from 'styles/game/GameResultItem.module.scss';
import { Team } from 'types/gameTypes';

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
            <Link key={player.userId} href={`/users/${player.userId}`}>
              <div>{player.userId}</div>
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
}
