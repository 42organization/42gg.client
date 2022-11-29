import Link from 'next/link';
import router from 'next/router';
import { RankResult, RankPlayer, NormalPlayer } from 'types/gameTypes';
import PlayerImg from 'components/PlayerImg';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigTeamProps {
  team: RankResult;
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
      {team.players.map((player, index) => (
        <div
          key={player.intraId}
          onClick={() => {
            router.push(`/users/detail?intraId=${player.intraId}`);
          }}
        >
          <PlayerImg
            keyNum={index}
            src={player.userImageUri}
            styleName={'gameResultBig'}
            size={30}
          />
        </div>
      ))}
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
