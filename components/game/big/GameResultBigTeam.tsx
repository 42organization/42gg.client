import Link from 'next/link';
import { Team } from 'types/gameTypes';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigTeamProps {
  team: Team;
}

// export function isRankPlayerType(
//   arg: RankPlayer | NormalPlayer
// ): arg is RankPlayer {
//   return 'wins' in arg;
// }

export default function GameResultBigTeam({ team }: GameResultBigTeamProps) {
  // const makeRate = (player: RankPlayer | NormalPlayer) => {
  //   return (
  //     <span>
  //       {isRankPlayerType(player)
  //         ? `${player.wins}승 ${player.losses}패`
  //         : `Lv. ${player.level}`}
  //     </span>
  //   );
  // };

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
          <div className={styles.winRate}>{`Lv. ${player.level}`}</div>
        </div>
      ))}
    </div>
  );
}
