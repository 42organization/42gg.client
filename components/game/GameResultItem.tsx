import { useSetRecoilState } from 'recoil';
import { GameData, RankPlayer, NormalPlayer } from 'types/gameTypes';
import { clickedGameItem } from 'utils/recoil/game';
import GameResultBigScore from 'components/game/big/GameResultBigScore';
import GameResultSmallScore from 'components/game/small/GameResultSmallScore';
import GameResultBigTeam from 'components/game/big/GameResultBigTeam';
import GameResultSmallTeam from 'components/game/small/GameResultSmallTeam';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultItemProps {
  game: GameData;
  isBig: boolean;
}

export default function GameResultItem({ game, isBig }: GameResultItemProps) {
  const { mode, team1, team2, status, time, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItem);

  return (
    <div
      className={isBig ? styles.bigContainer : styles.smallContainer}
      onClick={() => setClickedItemId(gameId)}
    >
      {isBig ? (
        <>
          <GameResultBigTeam team={team1} mode={mode} />
          <GameResultBigScore
            mode={mode}
            status={status}
            time={time}
            scoreTeam1={team1.score}
            scoreTeam2={team2.score}
          />
          <GameResultBigTeam team={team2} mode={mode} />
        </>
      ) : (
        <>
          <GameResultSmallTeam team={team1} userLeft={true} />
          <GameResultSmallScore
            mode={mode}
            scoreTeam1={team1.score}
            scoreTeam2={team2.score}
          />
          <GameResultSmallTeam team={team2} userLeft={false} />
        </>
      )}
    </div>
  );
}
