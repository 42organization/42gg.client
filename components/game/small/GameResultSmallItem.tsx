import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Game } from 'types/gameTypes';
import { clickedGameItemState } from 'utils/recoil/game';
import GameResultSmallScore from 'components/game/small/GameResultSmallScore';
import GameResultSmallTeam from 'components/game/small/GameResultSmallTeam';
import styles from 'styles/game/GameResultItem.module.scss';
import { SeasonMode } from 'types/mainType';

interface GameResultSmallItemProps {
  game: Game;
  type: 'LIGHT' | 'DARK';
  zIndexList: boolean;
  radioMode?: SeasonMode;
}

function GameResultSmallItem({
  game,
  type,
  zIndexList,
  radioMode,
}: GameResultSmallItemProps) {
  const { mode, team1, team2, gameId } = game;
  const setClickedItemId = useSetRecoilState(clickedGameItemState);

  return (
    <div
      id={String(gameId)}
      className={`${styles['smallItemContainer']} 
      ${styles[type.toLowerCase()]} ${
        radioMode !== undefined ? styles[radioMode.toLowerCase()] : ''
      } ${zIndexList ? styles['zIndexList'] : ''}`}
      onClick={() => setClickedItemId(gameId)}
    >
      <GameResultSmallTeam team={team1} position={'Left'} />
      <GameResultSmallScore
        mode={mode}
        scoreTeam1={team1.score}
        scoreTeam2={team2.score}
      />
      <GameResultSmallTeam team={team2} position={'Right'} />
    </div>
  );
}

export default React.memo(GameResultSmallItem);
