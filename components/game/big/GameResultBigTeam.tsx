import Link from 'next/link';
import { Team, Player, RankPlayer } from 'types/gameTypes';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigTeamProps {
  team: Team;
}

export function isRankPlayerType(arg: Player | RankPlayer): arg is RankPlayer {
  return 'wins' in arg;
}

export default function GameResultBigTeam({ team }: GameResultBigTeamProps) {
  return (
    <div className={styles.bigTeam}>
      {team.players.map((player, index) => (
        <div key={index}>
          <Link href={`/users/detail?intraId=${player.intraId}`}>
            <div>
              <PlayerImage
                src={player.userImageUri}
                styleName={'gameResultBig'}
                size={30}
              />
              <div className={styles.userId}>{player.intraId}</div>
            </div>
          </Link>
          <div className={styles.winRate}>
            <span>
              {isRankPlayerType(player)
                ? `${player.wins}승 ${player.losses}패`
                : `Lv. ${player.level}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
