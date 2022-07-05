import Image from 'next/image';
import Link from 'next/link';
import { Team } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

type gameResultTypes = {
  team: Team;
};

export default function GameResultBigTeam({ team }: gameResultTypes) {
  return (
    <div className={styles.bigTeam}>
      <div className={styles.userImage}>
        {team.players.map((player, index) => (
          <Image
            key={index}
            src={player.userImageUri}
            alt='prfImg'
            layout='fill'
            objectFit='cover'
            sizes='30vw'
            quality='30'
          />
        ))}
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
