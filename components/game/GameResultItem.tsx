import { useSetRecoilState } from 'recoil';
import styles from 'styles/GameResultItem.module.scss';
import { Game } from 'types/gameTypes';
import { clickedGameItem } from 'utils/recoil/game';
import GameResultBigScore from 'components/game/big/GameResultBigScore';
import GameResultSmallScore from 'components/game/small/GameResultSmallScore';
import GameResultBigTeam from 'components/game/big/GameResultBigTeam';
import GameResultSmallTeam from 'components/game/small/GameResultSmallTeam';

type gameResultTypes = {
  game: Game;
  big: boolean;
};

export default function GameResultItem({ game, big }: gameResultTypes) {
  const { team1, team2, status, gameId } = game;
  const setClickedItemId = useSetRecoilState<number>(clickedGameItem);

  return <>{big ? <BigItem /> : <SmallItem />}</>;

  function SmallItem() {
    return (
      <div
        className={styles.smallContainer}
        onClick={() => setClickedItemId(gameId)}
      >
        <GameResultSmallTeam team={team1} userLeft={true} />
        <GameResultSmallScore team1={team1} team2={team2} />
        <GameResultSmallTeam team={team2} userLeft={false} />
      </div>
    );
  }

  function BigItem() {
    return (
      <div
        className={styles.bigContainer}
        onClick={() => setClickedItemId(gameId)}
      >
        <GameResultBigTeam team={team1} userLeft={true} />
        <GameResultBigScore status={status} team1={team1} team2={team2} />
        <GameResultBigTeam team={team2} userLeft={false} />
      </div>
    );
  }
}
