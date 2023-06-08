import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultBigScore from 'components/game/big/GameResultBigScore';
import GameResultBigTeam from 'components/game/big/GameResultBigTeam';
import styles from 'styles/game/GameResultItem.module.scss';

interface GameResultBigItemProps {
  game: Game;
  type: 'LIGHT' | 'DARK';
  zIndexList: boolean;
}

function GameResultBigItem({ game, type, zIndexList }: GameResultBigItemProps) {
  const { mode, team1, team2, status, time, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);
  return (
    <div
      onClick={() => setClickedItemId(gameId)}
      id={String(gameId)}
      className={`${styles['bigItemContainer']} ${styles[type.toLowerCase()]} 
      ${zIndexList && styles['zIndexList']}`}
    >
      <GameResultBigTeam team={team1} />
      <GameResultBigScore
        mode={mode}
        status={status}
        time={time}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
      />
      <GameResultBigTeam team={team2} />
    </div>
  );
}

export default React.memo(GameResultBigItem);
