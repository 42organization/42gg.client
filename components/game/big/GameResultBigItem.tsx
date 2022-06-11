import { useSetRecoilState } from 'recoil';
import styles from '../../../styles/GameResultItem.module.css';
import { Game } from '../../../types/gameTypes';
import { ItemClickState } from '../../../utils/recoil/game';
import GameResultBigScore from './GameResultBigScore';
import GameResultBigTeam from './GameResultBigTeam';

type gameResultTypes = {
  game: Game;
};

export default function GameResultBiglItem({ game }: gameResultTypes) {
  const { team1, team2 } = game;
  const setIsItemClick = useSetRecoilState<number>(ItemClickState);

  return (
    <div className={styles.div} onClick={() => setIsItemClick(game.matchId)}>
      <div>
        {/* team1 view */}
        <GameResultBigTeam game={game} team={team1} />
        {/* 경기 타입, 시간, 이긴사람, 스코어 */}
        <GameResultBigScore game={game} team1={team1} team2={team2} />
        {/* team2 */}
        <GameResultBigTeam game={game} team={team2} />
      </div>
    </div>
  );
}
