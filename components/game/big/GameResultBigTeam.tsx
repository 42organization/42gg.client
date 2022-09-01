import Image from 'next/image';
import Link from 'next/link';
import { RankInfo, RankPlayer, NormalPlayer } from 'types/gameTypes';
import styles from 'styles/game/GameResultItem.module.scss';
import router from 'next/router';

interface GameResultBigTeamProps {
  mode: string;
  team: RankInfo;
}

export function isRankPlayerType(
  arg: RankPlayer | NormalPlayer
): arg is RankPlayer {
  return 'wins' in arg;
}

export default function GameResultBigTeam({
  mode,
  team,
}: GameResultBigTeamProps) {
  const makeRate = (player: RankPlayer | NormalPlayer) =>
    isRankPlayerType(player) ? (
      <>
        <span>{player.wins}승</span>
        <span>{player.losses}패</span>
      </>
    ) : (
      <span>{player.level}</span>
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
