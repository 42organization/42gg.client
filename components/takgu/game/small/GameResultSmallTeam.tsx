import { Team } from 'types/takgu/gameTypes';
import PlayerImage from 'components/takgu/PlayerImage';
import styles from 'styles/takgu/game/GameResultItem.module.scss';

interface GameResultSmallTeamProps {
  team: Team;
  position: 'Left' | 'Right';
}

export default function GameResultSmallTeam({
  team,
  position,
}: GameResultSmallTeamProps) {
  return (
    <div className={`${styles['smallTeam']} ${styles[position]}`}>
      {team.players.map((player, index) => (
        <PlayerImage
          key={index}
          src={player.userImageUri}
          styleName={'gameResultSmall'}
          size={20}
        />
      ))}
      {team.players.map((player) => (
        <span key={player.intraId}>{player.intraId}</span>
      ))}
    </div>
  );
}
