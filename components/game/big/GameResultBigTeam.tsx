import Link from 'next/link';
import Image from 'next/image';
import router from 'next/router';
import { RankInfo, RankPlayer, NormalPlayer } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigTeamProps {
  team: RankInfo;
}

export function isRankPlayerType(
  arg: RankPlayer | NormalPlayer
): arg is RankPlayer {
  return 'wins' in arg;
}

export default function GameResultBigTeam({ team }: GameResultBigTeamProps) {
  const makeRate = (player: RankPlayer | NormalPlayer) =>
    isRankPlayerType(player) ? (
      <span>
        {player.wins}승 {player.losses}패
      </span>
    ) : (
      <span>Lv. {player.level}</span>
    );

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
            onClick={() => {
              router.push(`/users/detail?intraId=${player.intraId}`);
            }}
          />
        ))}
      </div>
      {team.players.map((player) => (
        <div key={player.intraId}>
          <Link href={`/users/detail?intraId=${player.intraId}`}>
            <div className={styles.userId}>{player.intraId}</div>
          </Link>
          <div className={styles.winRate}>{makeRate(player)}</div>
        </div>
      ))}
    </div>
  );
}
