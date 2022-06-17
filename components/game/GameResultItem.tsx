import { useSetRecoilState } from 'recoil';
import styles from '../../styles/GameResultItem.module.scss';
import { Game } from '../../types/gameTypes';
import { clickedGameItem } from '../../utils/recoil/game';
import GameResultBigScore from './big/GameResultBigScore';
import GameResultSmallScore from './small/GameResultSmallScore';
import GameResultBigTeam from './big/GameResultBigTeam';
import GameResultSmallTeam from './small/GameResultSmallTeam';

type gameResultTypes = {
  game: Game;
  big: boolean;
};

export default function GameResultItem({ game, big }: gameResultTypes) {
  const { team1, team2, status, gameId } = game;
  const setClickedItemId = useSetRecoilState<number>(clickedGameItem);

  return (
    <div
      className={[styles.div, styles.container].join(' ')}
      onClick={() => setClickedItemId(gameId)}
    >
      {big ? <BigItem key={gameId} /> : <SmallItem key={gameId} />}
    </div>
  );

  function SmallItem() {
    return (
      <>
        {/* team1 user  */}
        <GameResultSmallTeam team={team1} userLeft={true} />
        {/* 스코어 */}
        <GameResultSmallScore team1={team1} team2={team2} />
        {/* team2 user  */}
        <GameResultSmallTeam team={team2} userLeft={false} />
      </>
    );
  }

  function BigItem() {
    return (
      <>
        {/* team1 view */}
        <GameResultBigTeam team={team1} userLeft={true} />
        {/* 스코어 */}
        <GameResultBigScore status={status} team1={team1} team2={team2} />
        {/* team2 */}
        <GameResultBigTeam team={team2} userLeft={false} />
      </>
    );
  }
}
