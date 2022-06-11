import styles from '../../../styles/GameResultItem.module.css';
import { Game, Team } from '../../../types/gameTypes';

export default function GameResultBiglItem({
  game,
  team1,
  team2,
}: {
  game: Game;
  team1: Team;
  team2: Team;
}) {
  const { time, status, type } = game;

  return (
    <div className={styles.div}>
      <div>
        <div>게임 타입 : {type}</div>
        <div>{time}</div>
        <div>{status}</div>
        <div>
          이긴사람 :{' '}
          {team1.isWin
            ? team1.players.map((player) => player.userId).join(',')
            : team2.players.map((player) => player.userId).join(',')}
        </div>
        <div>
          스코어 {team1.score} : {team2.score}
        </div>
      </div>
    </div>
  );
}
