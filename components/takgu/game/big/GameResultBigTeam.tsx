import Link from 'next/link';
import { Team, Player, RankPlayer } from 'types/takgu/gameTypes';
import PlayerImage from 'components/takgu/PlayerImage';
import styles from 'styles/takgu/game/GameResultItem.module.scss';

interface GameResultBigTeamProps {
  team: Team;
  zIndexList?: boolean;
}

export function isRankPlayerType(arg: Player | RankPlayer): arg is RankPlayer {
  return 'wins' in arg;
}

export default function GameResultBigTeam({
  team,
  zIndexList,
}: GameResultBigTeamProps) {
  return (
    <div className={styles.bigTeam}>
      {team.players.map((player, index) => (
        <div key={index}>
          <Link href={`/takgu/users/detail?intraId=${player.intraId}`}>
            <div>
              <PlayerImage
                src={player.userImageUri}
                styleName={'gameResultBig'}
                size={30}
              />
              <div className={styles.userId}>{player.intraId}</div>
            </div>
          </Link>
          <div
            className={`${styles['winRate']}
            ${zIndexList && styles['zIndexWinRate']}`}
          >
            {isRankPlayerType(player)
              ? `${player.wins}승 ${player.losses}패`
              : `Lv. ${player.level}`}
          </div>
        </div>
      ))}
    </div>
  );
}
