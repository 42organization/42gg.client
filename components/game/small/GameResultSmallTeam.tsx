import { RankResult } from 'types/gameTypes';
import PlayerImage from 'components/PlayerImage';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultSmallTeamProps {
  team: RankResult;
  position: string;
}

export default function GameResultSmallTeam({
  team,
  position,
}: GameResultSmallTeamProps) {
  return (
    <div className={styles.smallTeam}>
      <div className={styles[position]}>
        {team.players.map((player, index) => (
          <PlayerImage
            key={index}
            src={player.userImageUri}
            styleName={'gameResultSmall' + position}
            size={20}
          />
        ))}
        <span>
          {team.players.map((player) => (
            <div key={player.intraId}>{player.intraId}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
