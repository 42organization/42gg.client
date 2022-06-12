import styles from '../../../styles/GameResultItem.module.css';
import { Game, Team } from '../../../types/gameTypes';

type gameResultTypes = {
  game: Game;
  team: Team;
};
export default function GameResultBigTeam({ game, team }: gameResultTypes) {
  return (
    <div className={styles.div}>
      <div>
        {team.players.map((player) => (
          <span key={game.matchId + player.userImageUri}>
            {player.userImageUri} : {player.userId}
          </span>
        ))}
      </div>
      <div>
        intra id :{' '}
        {team.players.map((player) => (
          <div key={game.matchId + player.userId}>
            <span>{player.userId}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
