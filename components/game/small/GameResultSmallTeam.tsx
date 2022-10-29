import Image from 'next/image';
import { RankResult } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultSmallTeamProps {
  team: RankResult;
  userLeft: boolean;
}

export default function GameResultSmallTeam({
  team,
  userLeft,
}: GameResultSmallTeamProps) {
  return (
    <div className={styles.smallTeam}>
      <div className={userLeft ? styles.smallLeft : styles.smallRight}>
        <span className={styles.userImage}>
          {team.players.map((player, index) => (
            <Image
              key={index}
              src={player.userImageUri}
              alt='prfImg'
              layout='fill'
              objectFit='cover'
              sizes='20vw'
              quality='20'
            />
          ))}
        </span>
        <span>
          {team.players.map((player) => (
            <div key={player.intraId}>{player.intraId}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
