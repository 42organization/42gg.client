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
      {big ? <BigItem /> : <SmallItem />}
    </div>
  );

  function SmallItem() {
    return (
      <>
        <GameResultSmallTeam team={team1} userLeft={true} />
        <GameResultSmallScore team1={team1} team2={team2} />
        <GameResultSmallTeam team={team2} userLeft={false} />
      </>
    );
  }

  function BigItem() {
    return (
      <>
        <GameResultBigTeam team={team1} userLeft={true} />
        <GameResultBigScore status={status} team1={team1} team2={team2} />
        <GameResultBigTeam team={team2} userLeft={false} />
      </>
    );
  }
}
