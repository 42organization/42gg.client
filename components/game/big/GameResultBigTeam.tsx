import { Team } from 'types/gameTypes';
import Link from 'next/link';
import styles from 'styles/game/GameResultItem.module.scss';

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
              <div key={player.intraId}>{player.intraId}</div>
            ))} */}
      </div>
      {team.players.map((player) => (
        <div key={player.intraId}>
          <Link href={`/users/${player.intraId}`}>
            <div className={styles.userId}>{player.intraId}</div>
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
