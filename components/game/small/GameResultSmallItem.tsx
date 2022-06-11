import { useSetRecoilState } from 'recoil';
import { Game } from '../../../types/gameTypes';
import { ItemClickState } from '../../../utils/recoil/game';
import styles from '../../../styles/GameResultItem.module.css';
import GameResultSmallScore from './GameResultSmallScore';
import GameResultSmallTeam from './GameResultSmallTeam';

type gameResultTypes = {
  game: Game;
};

export default function GameResultSmallItem({ game }: gameResultTypes) {
  const { team1, team2 } = game;
  const setIsItemClick = useSetRecoilState<number>(ItemClickState);

  return (
    <div className={styles.div} onClick={() => setIsItemClick(game.matchId)}>
      {/* team1 user  */}
      <GameResultSmallTeam game={game} team={team1} />
      {/* 스코어 */}
      <GameResultSmallScore game={game} team1={team1} team2={team2} />
      {/* team2 user  */}
      <GameResultSmallTeam game={game} team={team2} />
    </div>
  );
}
